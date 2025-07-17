const User = require("../models/user.js");

module.exports.signUp = async(req,res)=>{
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
}

module.exports.logIn = (req,res)=>{
    res.render("user/login.ejs")
}

module.exports.renderLoginForm = async(req,res)=>{
        req.flash("success","Welcome to Grand Voyager! You are logged in");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect("/listings")
}

module.exports.logOut = (req,res,next)=>{
    //this .logout method is also provided by passport--read documentation
     req.logOut((err)=>{
        if(err){
          return  next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings")
     })
}

