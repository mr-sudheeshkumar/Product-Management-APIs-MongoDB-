const mongoose = require("mongoose");

//Company's Schema
const companySchema = mongoose.Schema({
    companyid : String,
    name : String,
    productid : [{type:String}] //Array of String
});

const companyModel = mongoose.model("companies",companySchema,"companies");

module.exports = companyModel;