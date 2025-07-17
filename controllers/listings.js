const Listing = require("../models/listing");

module.exports.index = async(req,res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = async(req,res) =>{
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path :"reviews",populate:{path:"author"}}).populate("owner");
    if (!listing) {
        req.flash("error","Listing does not exist");
        res.redirect("/listings");
        // throw new ExpressError(404, "Listing not found!");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
}

module.exports.createListing = async (req, res) => {
    let listing = new Listing(req.body.listing);
    listing.owner = req.user._id;
    await listing.save();
    req.flash("success", "New Listing Created!");
    res.redirect(`/listings`);
}

module.exports.renderEditForm = async(req,res) =>{
    let { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error","Listing does not exist");
            res.redirect("/listings");
            // throw new ExpressError(404, "Listing not found!");
        }
        req.flash("success","Listing Edited!")
        res.render("listings/edit.ejs", { listing });
}

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    //... these three dots impllies that we are deconstructing the changes done
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success","Listing Edited!")
    // req.flash("success","Listing you want to edit does not exist!");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
}