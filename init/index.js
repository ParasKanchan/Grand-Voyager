const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
    mongoose.connect("mongodb://localhost:27017/GrandVoyager");
}
main().then(()=>{console.log("Connected to DB")}).catch(err=>{console.log(err)});

const initDB = async () => {
    await Listing.deleteMany({});
    
    initData.data =  initData.data.map((obj)=>({...obj,owner : "67df1afbc257db038967c056"}));
   console.log(initData.data);  
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();