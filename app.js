const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");
require('dotenv').config();

// async function main() {
//     await mongoose.connect("mongodb://localhost:27017/GrandVoyager");
// }
// main().then(() => { console.log("Connected to DB"); }).catch(err => { console.log(err); });

const dbURL = process.env.ATLAS_URL;

 main().then(() => { console.log("Connected to DB"); }).catch(err => { console.log(err); });
 async function main() {
     await mongoose.connect(dbURL);
 }


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// app.get("/", (req, res) => {
//     res.send("Hi, I am root");
// });

const store = MongoStore.create({
    mongoUrl : dbURL,
    crypto : {
        secret : process.env.SECTRET
    },
    touchAfter : 24 * 3600 //session apne aap se kab update ho jaaega
})

store.on("error",()=>{
    console.log("Error in MONGO SESSION STORE ",err)
})

const sessionOptions = {
    store,
    secret : process.env.SECTRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 *24 * 60 * 60 *1000,//After this time cookie will expire---Date.now()gives time in milisecond
        maxAge : 7 *24 * 60 * 60 *1000,
        httpOnly : true,//for security purposes
    }
}

app.use(session(sessionOptions));
app.use(flash());

//Configuring strategy for using passport as a middleware
//hasing algorithm implemeted is "pbkdf2"
app.use(passport.initialize());
app.use(passport.session());//every request should know that it is the part of which session--to handle this we used this middleware

//use static authenticate method of model in "LocalStrategy"
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    //To access the user in ejs template of signup login & logout
    res.locals.currUser = req.user
    next();
})

app.get("/demouser", async(req,res)=>{
    let fakeUser = new User({
        email : "std1@gmail.com",
        username : "delta1"//this username will override the username given by passport-local-mongoose
    })

    //to register a new user instance with a given instance
   let registeredUser = await User.register(fakeUser,"helloworld");
    //here helloworld is a password
    res.send(registeredUser);
});

// Mounting Routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", (req, res, next) => {
    req.listingId = req.params.id; // Pass the ID to the router
    next();
}, reviewRouter);
app.use("/",userRouter);

// Handling unknown routes

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not Found!!"));
});



// Error Handling Middleware
app.use((err, req, res, next) => {
    let { statuscode = 500, message = "Something Went Wrong!" } = err;
    res.status(statuscode).render("error.ejs", { message });
});

app.listen(8080, () => {
    console.log("App is running on port 8080");
});
