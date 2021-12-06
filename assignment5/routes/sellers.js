const express = require("express");
const router = express.Router();
router.use(express.json());

const sellerModel = require("../models/sellermodel");
const prodModel = require("../models/productmodel");

//Add seller
router.post("/add", (req,res) =>{
    const { newSeller } = req.body;
    const addNewSeller = sellerModel.create(newSeller);
    return res.json({data: "Seller Added Successfully."});
});

//Fetching seller details based on product name
router.get("/list/:prodname", async (req,res) =>{
    const prod = await prodModel.findOne({title: req.params.prodname});
    const sellerid = prod.sellerid;
    const sellerlength = sellerid.length;
    var sellerlist = [];
    var i=0;
    if(sellerlength>1){
        while(i<sellerlength){
            sellerlist[i] = await sellerModel.findOne({sellerid:sellerid[i]});
            i+=1;
        }
    }else{
        sellerlist[0] = await sellerModel.findOne({sellerid:sellerid[0]});
    }
    return res.json({data: sellerlist});
    
});

//update seller (add/remove products)
router.put("/updateprods/:sellerid", async (req,res) =>{
    const updatedCompany = await sellerModel.findOneAndUpdate({sellerid: req.params.sellerid},{productid: req.body.prodlist});
    return res.json({data: "Seller's Product List Updated successfully."});
});

//Delete seller
router.delete("/del/:sellerid", async (req,res) =>{
    const delSeller = await sellerModel.findOneAndDelete({sellerid: req.params.sellerid});
    return res.json({data: "Seller deleted successfully."});
});

module.exports = router;