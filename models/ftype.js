var mongoose = require("mongoose");
var ticketSchema = new mongoose.Schema({
    from:String,
    to:String,
    meal:String,
    number:Number,
    flight:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"flight"
    }
});
module.exports = mongoose.model("Ticket", ticketSchema);