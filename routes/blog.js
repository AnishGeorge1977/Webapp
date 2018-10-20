var express     = require("express"),
router          = express.Router(),
Blog            = require("../models/blog");

//GET : Method to find all blogs
router.get("/",function(req , res){
    Blog.find({},function(err , allBlogs){
        if(err){
            res.render("home",{username : req.user.username});
        }else{
            res.render("blog/blogs", {blogs : allBlogs});
        }
    });
});

//GET : Method for populating details for a new blog
router.get("/new",function(req , res){
    res.render("blog/new");
});

//POST : Method for saving the blog
router.post("/",function(req , res){
    req.body.blog.body = req.sanitize(req.body.blog.body); //Sanitize the body for unwanted java scripts
    Blog.create({
        title : req.body.blog.title,
        image : req.body.blog.image,
        body  : req.body.blog.body
    } , function(err , newBlog){
        if(err){
            //req.flash("error" , "Blog could not be created"+err.message);
            res.render("home", {username : req.user.username});  
            
        } else {
             //req.flash("success" , "Blog created successfully");
             res.render("home" , {username : req.user.username});
            
        }
    });
});

module.exports = router;