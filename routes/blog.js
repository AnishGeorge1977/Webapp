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
    var blog = { title : req.body.blog.title,
        image : req.body.blog.image,
        body  : req.body.blog.body,
        created : Date.now()
    };
    Blog.create(blog , function(err , newBlog){
        if(err){
            //req.flash("error" , "Blog could not be created"+err.message);
            console.log(err);
            res.render("home", {username : req.user.username});  
            
        } else {
             //console.log("New Blog Created :"+newBlog);
             res.render("home" , {username : req.user.username});
            
        }
    });
});

//GET : Method to get the blog by blog id
router.get("/:blogid",function(req , res){
    Blog.findById(req.params.blogid,function(err , foundBlog){
        if(err){
            res.render("home" , {username : req.user.username});
        } else {
            var blog = foundBlog;
           res.render("blog/show" , {blog , foundBlog}); 
        }
    });
});

//GET : Method to edit the blog by blog id
router.get("/:blogid/edit",function(req , res){
      Blog.findById(req.params.blogid,function(err , blogfound){
        if(err){
            res.render("home");
        } else {
           var blog = blogfound;
           res.render("blog/edit" , {blog , blogfound}); 
        }
    });  
});

//PUT : Method to update the blog
router.put("/:blogid",function(req , res){
    //console.log("Inside the put method------------------------->"+req.params.blogid);
    Blog.findByIdAndUpdate(req.params.blogid, req.body.blog, function(err , blog){
        if(err){
           res.render("home" , {username : req.user.username}); 
        }else{
           res.render("home" , {username : req.user.username}); 
        }
    });
});

//DELETE : Method to delete the blog
router.delete("/:blogid",function(req , res){
   Blog.findByIdAndRemove(req.params.blogid , function(err , newBlog){
       if(err){
           res.render("home" , {username : req.user.username});
       } else {
           res.render("home" , {username : req.user.username});
       }
   }); 
});



module.exports = router;