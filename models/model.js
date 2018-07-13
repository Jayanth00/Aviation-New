var mongoose = require("mongoose");

// var campgroundSchema = new mongoose.Schema({
//    name: String,
//    image: String,
//    description: String,
//    comments: [
//       {
//          type: mongoose.Schema.Types.ObjectId,
//          ref: "Comment"
//       }
//    ]
// });

// module.exports = mongoose.model("Campground", campgroundSchema);
 



 var flightSchema = new mongoose.Schema({
 	image:String,
 	name1:String,
 	name2:String,
 	arrival:String,
 	arrtime:String,
 	departure:String,
 	deptime:String,
    duration:String,
    detail:String,
 	price:String

 });
 module.exports = mongoose.model("flight",flightSchema);
