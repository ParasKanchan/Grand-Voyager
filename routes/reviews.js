// const express = require("express");
// const router = express.Router();
// const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js")
// const { reviewSchema} = require("../schema.js");
// const Review = require("../models/reviews.js") 

// //for server side validation of review
// const validateReview = (req,res,next)=>{

//     const {error}= reviewSchema.validate(req.body);
    
//     if(error){
//         let errMsg = error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(400,errMsg);
//     }else{
//         next();
//     }

// }


// //Reviews
// //Posting reviews
// router.post("/", validateReview, wrapAsync(async(req,res)=>{
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review);
 
//     listing.reviews.push(newReview);
 
//     await newReview.save();
//     await listing.save();
//    // res.send("New Review Saved");
//    res.redirect(`/listings/${listing._id}`);
//  }));
 
//  //Deleting Reviews
//  router.delete("/:reviewId",wrapAsync(async(req,res)=>{
 
//      let {id, reviewId} = req.params;
//      //pull operator help us to remove a particular value which matches a specified condition
//      await Listing.findByIdAndUpdate(id , {$pull :{reviews: reviewId}});
//      await Review.findByIdAndDelete(reviewId); 
     
//      res.redirect(`/listings/${id}`);
//  }))
 
 
 
//  //Show Route
//  router.get("/listings/:id",wrapAsync(async(req,res)=>{
 
//       let {id} = req.params;
//       //populate method is to extract all info from reviews related to a listing
//       const listing = await Listing.findById(id).populate("reviews");
//       res.render("listings/show.ejs",{listing});
//  }));

//  module.exports = router;




const express = require("express");
const router = express.Router({ mergeParams: true }); // Merge params to access ":id" from parent route
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const flash = require("connect-flash");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../Middleware.js")

// Post Review Route (Add review for a specific listing)
router.post("/",isLoggedIn, validateReview, wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`);
}));

// Delete Review Route (Remove a specific review)
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;
