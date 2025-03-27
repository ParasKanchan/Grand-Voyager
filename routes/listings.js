// const express = require("express");
// const router = express.Router();
// const wrapAsync = require("../utils/wrapAsync.js");
// const {listingSchema} = require("../schema.js");
// const ExpressError = require("../utils/ExpressError.js")
// const Listing = require("../models/listing.js");

// //middleware for validation
// const validationListing = (req,res,next)=>{

//     const {error}= listingSchema.validate(req.body);
    
//     if(error){
//         let errMsg = error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(400,errMsg);
//     }else{
//         next();
//     }

// }


// //Index-Route
// router.get("/", wrapAsync(async(req,res)=>{
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs",{allListings});
// }));


// //note that new route should be above show route otherwise 'new' in the path will be considered as id 
// //new route
// router.get("/new",(req,res)=>{
//     res.render("listings/new.ejs");
// });

// //create route--passing  validateListing as a middleware
// router.post("/",validationListing, wrapAsync(async(req,res,next)=>{
//     const result= listingSchema.validate(req.body);//is our listing body is able to validate our schema
//     console.log(result);
// //this will not stop server but identifies and prints the error on the console.

//     if(result.error){
//         throw new ExpressError(400, result.error);
//     }

//       // let {title,description,price,image,location,country} = req.body;-->w/o listing[] in new.ejs BUT now
//     let listing = req.body.listing;
//     const newListing = new Listing(listing);
//    //Or
//    //new Listing(req.body.listing);
//     await newListing.save().then(()=>{console.log("saved to Db")});
//     res.redirect("/listings");
    
// }));


// //Edit route
// router.get("/:id/edit", wrapAsync(async(req,res)=>{
//     let {id} = req.params;
//     const listing = await Listing.findById(id);
//     res.render("listings/edit.ejs",{listing});
// }))
// //Update Route
// router.put("/:id", validationListing ,wrapAsync(async(req,res)=>{
   
//     let {id} = req.params;
//     
//    await Listing.findByIdAndUpdate(id,{...req.body.listing});
//     res.redirect(`/listings/${id}`);
// }))

// //Delete route
// router.delete("/:id", wrapAsync(async(req,res)=>{
//     let {id} = req.params;
//    let deletedListing =  await Listing.findByIdAndDelete(id);
//    console.log(deletedListing);
//    res.redirect("/listings")
// }));





// module.exports = router;



const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing} = require("../Middleware.js")

// // Middleware for validation
// const validateListing = (req, res, next) => {
//     const { error } = listingSchema.validate(req.body);
    
//     if (error) {
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     } else {
//         next();
//     }
// };

// Index Route - Show all listings
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

// New Route - Show form to create a new listing
router.get("/new",isLoggedIn, (req, res) => {
   
    res.render("listings/new.ejs");
});

// Create Route - Add a new listing
router.post("/",isLoggedIn, validateListing, wrapAsync(async (req, res) => {
    let listing = new Listing(req.body.listing);
    listing.owner = req.user._id;
    await listing.save();
    req.flash("success", "New Listing Created!");
    res.redirect(`/listings`);
}));

// Show Route - Show details of a specific listing
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path :"reviews",populate:{path:"author"}}).populate("owner");
    if (!listing) {
        req.flash("error","Listing does not exist");
        res.redirect("/listings");
        // throw new ExpressError(404, "Listing not found!");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
}));

// Edit Route - Show form to edit a listing
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error","Listing does not exist");
        res.redirect("/listings");
        // throw new ExpressError(404, "Listing not found!");
    }
    req.flash("success","Listing Edited!")
    res.render("listings/edit.ejs", { listing });
}));

// Update Route - Update listing details
router.put("/:id",isLoggedIn,isOwner, validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    //... these three dots impllies that we are deconstructing the changes done
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success","Listing Edited!")
    // req.flash("success","Listing you want to edit does not exist!");
    res.redirect(`/listings/${id}`);
}));

// Delete Route - Remove a listing
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
}));

module.exports = router;
