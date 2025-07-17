const mongoose = require("mongoose");
const { type } = require("../schema");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");
const { ref } = require("joi");

const listingSchema = new Schema({
    title :{
        type : String,
       required : true
    },
    description : {
        type:String,
        required : true
    },

    image : {
        default:"https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=2210&quality=70",
        type : String,
        set: (v)=>v===""?"https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=2210&quality=70":v,
    },
    price : {
        type : Number,
       required : true
    },
    location : {
        type : String,
        required : true
    },
    country : {
        type:String,
       required :true
    },
    reviews : [{
        type : Schema.Types.ObjectId,
        ref : "Review",
    }],
    //Schema(owner) for authorization which is based on giving permissions
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
})



listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
    await Review.deleteMany({_id : {$in : listing.reviews}});
    }
})

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;