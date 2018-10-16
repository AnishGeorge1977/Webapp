var express = require("express");
var app = express();
var indexRoutes = require("./routes/index");
var flash = require("connect-flash");
var passport = require("passport");
var localStrategy  = require("passport-local");

var prodConfig = false;
app.set("view engine","ejs");

app.use(indexRoutes);
app.use(flash());
app.use(express.static(__dirname+"/public")); //Setting the directory name directly

//////////////PASSPORT CONFIGURATION ////////////////////
app.use(require("express-session")({
    secret : "Yelp Camp - Best in the world",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());



//User Management across routes
app.use(function(req , res , next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

if(prodConfig){
    //Server Demon Thread - Running in Production Mode.
   var server = app.listen(3000, function() {
    console.log('Ready on port %d', server.address().port);
}); 
} else {
 //Server Demon Thread - Running in Staging Mode.
app.listen(process.env.PORT , process.env.IP , function(){
    console.log("Server ready of service !!!");
});   
}


