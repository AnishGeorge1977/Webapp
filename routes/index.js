var express     = require("express"),
router          = express.Router(),
passport        = require("passport"),
User            = require("../models/user.js"),
Enquiry         = require("../models/enquiry.js"),
middlewareObj   = require("../middleware");

//Index Landing page
router.get("/",function(req , res){
    res.render("landing/landing" , {username : req.body.username});
});

//GET : Landing Page
router.get("/landing",function(req , res){
    res.render("landing/landing" , {username : req.body.username});
});

//GET : Method to view portfolio
router.get("/portfolio",function(req , res){
    res.render("portfolio/profile");
});

//GET : Method to download Resume
router.get("/download",function(req , res){
   //console.log("Inside the download function"+__dirname);
   var file = __dirname+'/resources/Anish George_Resume.pdf';
   res.download(file);   
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
    //console.log("User Email :=====================>"+req.body.email);
    User.register(new User({username : req.body.username}), req.body.password, function(err , newUser){
        if(err){
             res.render("auth/signup" , {message : err.message});
        } else {
            passport.authenticate("local")(req, res , function(){
            User.findOneAndUpdate(newUser._id,{email : req.body.email},function(err,updateUser){
                if(err){
                    req.flash("error" , "Error in update !!");
                }else{
                    req.flash("success" , "Updated successfully");
                }
            });    
            res.render("landing/landing",{username : req.body.username});  
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
     res.render("landing/landing",{username : req.user.username});
});

//GET : Log out user
router.get("/logout",function(req , res){
    req.logout();
    req.flash("success" , "Logout sccessfull !!");
    res.redirect("/");
});

//POST : Enquiry

router.post("/enquiry",function(req , res){

    var enquiry = {
        username : req.body.username,
        email : req.body.email,
        address:req.body.address
    };
    Enquiry.create(enquiry,function(err , newEnquiry){
          if(err){
            req.flash("error" , "Enquiry Failed");
          }  else {
            req.flash("success" , "Thanks for the enquiry. Will reach out shortly !");
            res.redirect("/portfolio");
          }
    });
});

//GET : Method to view all blogs
router.get("/blogs" , middlewareObj.isLoggedIn, function(req , res){
    res.redirect("/blog");
});




module.exports = router;
