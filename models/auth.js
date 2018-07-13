var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    age:String,
    gender:String,
    ticket:{
      type: mongoose.Schema.Types.ObjectId,
        ref:"Ticket"
    }
});

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema);