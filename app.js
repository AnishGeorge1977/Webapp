
/*
*Variable declaration section
*/
var express     = require("express"),
app             = express(),
mongoose        = require("mongoose"),
blogRoutes      = require("./routes/blog"),
indexRoutes     = require("./routes/index"),
flash           = require("connect-flash"),
passport        = require("passport"),
expSanitizer   = require("express-sanitizer"),
bodyParser      = require("body-parser"),
methodOverride = require("method-override"),
localStrategy   = require("passport-local"),
User            = require("./models/user"),
prodConfig      = true;

//mongoose.set('useCreateIndex', true);
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(expSanitizer()); // Must be after body-parser
app.use(methodOverride("_method"));
app.use(express.static(__dirname+"/public")); //Setting the directory name directly
if(prodConfig){
    mongoose.connect('mongodb://webappuser:webappuserpwd@localhost:27017/webapp', { useNewUrlParser: true }); //13.126.90.93
}else{
    mongoose.connect('mongodb://webappuser:webappuserpwd@localhost:27017/webapp', { useNewUrlParser: true });
}


//////////////PASSPORT CONFIGURATION ////////////////////
app.use(require("express-session")({
    secret : "My Web Page @123",
    resave : false,
    saveUninitialized : false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//User Management across routes
app.use(function(req , res , next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//User specific routes and see the order in which the routes are initilized in app.js
app.use("/blog",blogRoutes);
app.use(indexRoutes);



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


