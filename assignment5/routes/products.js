const express = require('express');
const router = express.Router();
router.use(express.json());

const prodModel = require("../models/productmodel");
const companyModel = require("../models/companymodel");
const sellerModel = require("../models/sellermodel");

//Add Product
router.post("/add", (req,res) => {
    const { newProd } = req.body;
    const addNewProd = prodModel.create(newProd);
    return res.json({data: "Product Added successfully."});
});

//Fetch all products of a company
router.get("/list/:companyname", async (req,res) =>{
    const comp = await companyModel.findOne({name: req.params.companyname});
    if(comp){
        const prod = await prodModel.find({companyid: comp.companyid});
        if(prod){
            return res.json({data: prod});
        }else{
            return res.json({data: "No Products found of company named : " + req.params.companyname});
        }
    }
    else{
        return res.json({data: "No Company found of company named : " + req.params.companyname});
    }
});

//Fetch all products of a seller
router.get("/list/seller/:sellerid", async (req,res) =>{
    const seller = await sellerModel.findOne({sellerid: req.params.sellerid});
    if(seller){
        const prod = await prodModel.find({sellerid: seller.sellerid});
        if(prod){
            return res.json({data: prod});
        }else{
            return res.json({data: "No Products found of Seller named " + seller.name});
        }
    }
    else{
        return res.json({data: "No Seller found with seller id : " + req.params.sellerid});
    }
});

//Update products(add/remove category)
router.put("/updatecategory/:prodid", async (req,res) =>{
    const updatedProducts = await prodModel.findOneAndUpdate({productid: req.params.prodid},{category: req.body.prodcategory});
    return res.json({data: "Product's category updated successfully."});
});

//Delete product
router.delete("/del/:prodid", async (req,res) =>{
    const delProd = await prodModel.findOneAndDelete({productid: req.params.prodid});
    return res.json({data: "Product deleted successfully."});
});

module.exports = router;