var express     = require("express"),
router          = express.Router(),
passport        = require("passport"),
User            = require("../models/user.js"),
middlewareObj   = require("../middleware");

//Index Landing page
router.get("/",function(req , res){
    res.render("landing");
});

//GET : Landing Page
router.get("/landing",function(req , res){
    res.render("landing");
});

//GET : Home Page
router.get("/home",function(req , res){
    res.render("home",{username : req.user.username});
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
            res.render("home",{username : req.body.username});  
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
     res.render("home",{username : req.user.username});
});

//GET : Log out user
router.get("/logout",function(req , res){
    req.logout();
    req.flash("success" , "Logout sccessfull !!");
    res.redirect("/");
});

//GET : Method to view all blogs
router.get("/blogs" , middlewareObj.isLoggedIn, function(req , res){
    res.redirect("/blog");
});

//GET : Method to view portfolio
router.get("/portfolio",function(req , res){
    res.render("portfolio/index");
});


module.exports = router;
