const  express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../Middleware.js");

router.get("/signup",(req,res)=>{
    res.render("user/signup.ejs");
});

router.post("/signup", wrapAsync(async(req,res)=>{
    try{
     let {username,email,password} = req.body;
    const newUser = new User({username,email});
    const registeredUser = await User.register(newUser,password);
    //this .login method is provided by passport---read documentation
    //here .login method has been used in order to implement functionality such that once a user is signed up automatically it is logged in
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);

        } 
        req.flash("success","Welcome to Grand Voyager");
        res.redirect("/listings");
    })
    }catch(err){
        req.flash("error",err.message);
        console.log(err.message)
        res.redirect("/signup")
    }
}));


router.get("/login",(req,res)=>{
    res.render("user/login.ejs")
});

//passport.authenticate will wwork as middleware and tell us whether a user exist in db of Grand Voyager
//local=>Configuration strategy
//failureRedirect =>If some problem whre to redirect
//failureFlash => if authenticationn fails some kind of message needs to be flashed
router.post("/login",
    saveRedirectUrl,//this we got from Middleware.js
    passport.authenticate("local",{failureRedirect:"/login",failureFlash : true}),
    wrapAsync(async(req,res)=>{
    
        req.flash("success","Welcome to Grand Voyager! You are logged in");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect("/listings")
}));

router.get("/logout",(req,res,next)=>{
    //this .logout method is also provided by passport--read documentation
     req.logOut((err)=>{
        if(err){
          return  next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings")
     })
})

module.exports = router;