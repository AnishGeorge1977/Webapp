var mongoose = require("mongoose");
var passportLocalMongoose  = require("passport-local-mongoose");

var enquirySchema = new mongoose.Schema({
    username : String,
    email : String,
    address:String
});

enquirySchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Enquiry",enquirySchema);