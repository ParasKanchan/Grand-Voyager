const express = require("express");
const router = express.Router({ mergeParams: true }); // Merge params to access ":id" from parent route
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const flash = require("connect-flash");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../Middleware.js")

const reviewController = require("../controllers/reviews.js")

// Post Review Route (Add review for a specific listing)
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// Delete Review Route (Remove a specific review)
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;
