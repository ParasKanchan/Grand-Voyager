const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    
    email : {
        type : String,
        required : true
    }
});
userSchema.plugin(passportLocalMongoose);//this will automatically define username and password,hashing , salting  etc. so we just need to define email

module.exports = mongoose.model("User", userSchema);