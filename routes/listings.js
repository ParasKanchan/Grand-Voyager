const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing} = require("../Middleware.js")

const listingController = require("../controllers/listings.js")

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
router.get("/", wrapAsync(
    listingController.index
));

// New Route - Show form to create a new listing
router.get("/new",isLoggedIn, listingController.renderNewForm);

// Create Route - Add a new listing
router.post("/",isLoggedIn, validateListing, wrapAsync(listingController.createListing));

// Show Route - Show details of a specific listing
router.get("/:id", wrapAsync(listingController.showListing));

// Edit Route - Show form to edit a listing
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

// Update Route - Update listing details
router.put("/:id",isLoggedIn,isOwner, validateListing, wrapAsync(listingController.editListing));

// Delete Route - Remove a listing
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;
