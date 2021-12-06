const mongoose = require("mongoose");

//Product's Schema
const prodSchema = mongoose.Schema({
    productid : String,
    title : String,
    price : String,
    category : [{type:String}], //Array of String
    companyid : String,
    sellerid : [{type:String}]  //Array of String
});

const prodModel = mongoose.model("products",prodSchema,"products");

module.exports =  prodModel;