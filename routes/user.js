const  express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../Middleware.js");

router.get("/signup",(req,res)=>{
    res.render("user/signup.ejs");
});

const userController = require("../controllers/users.js")

router.post("/signup", wrapAsync(userController.signUp));


router.get("/login",userController.logIn);

//passport.authenticate will wwork as middleware and tell us whether a user exist in db of Grand Voyager
//local=>Configuration strategy
//failureRedirect =>If some problem whre to redirect
//failureFlash => if authenticationn fails some kind of message needs to be flashed
router.post("/login",
    saveRedirectUrl,//this we got from Middleware.js
    passport.authenticate("local",{failureRedirect:"/login",failureFlash : true}),
    wrapAsync(userController.renderLoginForm));

router.get("/logout",userController.logOut)

module.exports = router;