const mongoose = require("mongoose");

//Seller's Schema
const sellerSchema = mongoose.Schema({
    sellerid : String,
    name : String,
    productid : [{type:String}] //Array of String
});

const sellerModel = mongoose.model("sellers",sellerSchema,"sellers");

module.exports = sellerModel;