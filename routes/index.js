var express = require("express");
var router = express.Router();

//Index Landing page
router.get("/",function(req , res){
    res.render("landing",{error : res.locals.error , success :  res.locals.success});
});

//Landing Page
router.get("/landing",function(req , res){
    res.render("landing", {error : res.locals.error , success :  res.locals.success});
});


module.exports = router;
