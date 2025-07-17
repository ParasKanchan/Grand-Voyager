//here we will use our joi package
const Joi = require("joi");

const listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        price : Joi.number().required().min(0),
        image : Joi.string().allow("",null),//here we are allowing string to be null or no value
        location : Joi.string().required(),
        country : Joi.string().required()
        
       
    }).required(),//any request must containg an object( which is listing )
});



// for server side validation of reviews schema
const reviewSchema = Joi.object({
    review : Joi.object({
      rating : Joi.number().required().min(1).max(5),
      comment : Joi.string().required()
    }).required()
})

module.exports = {listingSchema,reviewSchema};