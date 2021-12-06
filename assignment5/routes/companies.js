const express = require('express');
const { append } = require('vary');
const router = express.Router();
router.use(express.json());

const companyModel = require("../models/companymodel");
const prodModel = require("../models/productmodel");

//Add Company
router.post("/add", (req,res) =>{
    const {newCompany} = req.body;
    const addNewComp = companyModel.create(newCompany);
    return res.json({data: "Company Added successfully."});
});

//Fetching company details based on product name
router.get("/list/:prodname", async (req,res) =>{
    const prod = await prodModel.findOne({title: req.params.prodname});
    const compid = prod.companyid;
    const comp = await companyModel.findOne({companyid: compid});
    if(comp){
        return res.json({data: "Company Details :  " + "Company ID : " + comp.companyid + " Company Name : " + comp.name});
    }else{
        return res.json({data: "No details Found."});
    }
});

//Update Company(add/remove products)
router.put("/updateprods/:compid", async (req,res) =>{
    const updatedCompany = await companyModel.findOneAndUpdate({companyid: req.params.compid},{productid: req.body.prodlist});
    return res.json({data: "Company's Product List Updated successfully."});
});

//Delete company
router.delete("/del/:compid", async (req,res) =>{
    const delComp = await companyModel.findOneAndDelete({companyid: req.params.compid});
    return res.json({data: "Company deleted successfully."});
});

module.exports = router;