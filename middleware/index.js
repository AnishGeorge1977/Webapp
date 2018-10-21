var middlewareObj = {};

middlewareObj.isLoggedIn = function(req , res , next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error" , "You need to be a logged in user , Please log in !.");
    res.redirect("/login");
};

module.exports = middlewareObj;