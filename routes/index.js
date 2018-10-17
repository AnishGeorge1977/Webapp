var express     = require("express"),
router          = express.Router(),
passport        = require("passport"),
User            = require("../models/user.js");

//Index Landing page
router.get("/",function(req , res){
    res.render("landing");
});

//GET : Landing Page
router.get("/landing",function(req , res){
    res.render("landing");
});

//GET : Sign up page
router.get("/signup",function(req , res){
    var message = "";
    res.render("auth/signup", {message : message});
});

//POST : Sign up page - Please note the register function
router.post("/signup",function(req , res){
    User.register(new User({username : req.body.username}), req.body.password, function(err , newUser){
        if(err){
             res.render("auth/signup" , {message : err.message});
        } else {
            passport.authenticate("local")(req, res , function(){
            res.render("blog/blog",{username : req.body.username});  
            });
        }
    });
});

//GET : Login User
router.get("/login",function(req , res){
    res.render("auth/login")
});

// POST : Login Page using passport middleware
router.post("/login",passport.authenticate("local",{
    successRedirect : "/success",
    failureRedirect : "/failure",
    }),function(req , res){
});

//GET : Failure Page
router.get("/failure",function(req , res){
    res.render("auth/failure");
});

//GET : Success Page
router.get("/success",function(req , res){
     res.render("blog/blog",{username : req.user.username});
});

//GET : Log out user
router.get("/logout",function(req , res){
    req.logout();
    req.flash("success" , "Logout sccessfull !!");
    res.redirect("/");
});


module.exports = router;
