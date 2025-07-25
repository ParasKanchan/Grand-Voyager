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

// ✅ BONUS TIP: Handle favicon.ico request to avoid 500 error
app.get('/favicon.ico', (req, res) => res.status(204).end());

const store = MongoStore.create({
    mongoUrl: dbURL,
    crypto: {
        secret: process.env.SECTRET
    },
    touchAfter: 24 * 3600
});

store.on("error", (err) => {
    console.log("Error in MONGO SESSION STORE ", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.get("/demouser", async (req, res) => {
    let fakeUser = new User({
        email: "std1@gmail.com",
        username: "delta1"
    });

    let registeredUser = await User.register(fakeUser, "helloworld");
    res.send(registeredUser);
});

// Mounting Routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", (req, res, next) => {
    req.listingId = req.params.id;
    next();
}, reviewRouter);
app.use("/", userRouter);

// Catch-All for Undefined Routes
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not Found!!"));
});

// Error Handler Middleware
app.use((err, req, res, next) => {
    let { statuscode = 500, message = "Something Went Wrong!" } = err;
    res.status(statuscode).render("error.ejs", { message });
});

app.listen(8080, () => {
    console.log("App is running on port 8080");
});
