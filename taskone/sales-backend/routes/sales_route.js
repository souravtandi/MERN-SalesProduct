const express = require('express');
const app = express();
const router = express.Router();                             ;
const mongoose = require('mongoose');
const momentjs = require('moment');
const today = momentjs().startOf('day')

const SalesModel = mongoose.model("SalesModel");

router.post('/store-product-sale', (req, res)=>{

    const { name, quantity, amount } = req.body;
    if (!name) {
        return res.status(400).json({ error: "name field is empty" });
    }
    if (!quantity) {
        return res.status(400).json({ error: "quantity field is empty" });
    }
    if (!amount) {
        return res.status(400).json({ error: "amount field is empty" });
    }

    const salesModel = new SalesModel({
        productName: name,
        quantity: quantity,
        totalAmount: amount,
        dateOfSale: momentjs(new Date()).format('YYYY-MM-DD')
    });

    salesModel.save()
    .then((savedProduct)=>{
        res.status(201).json({"createdSales": savedProduct})
    })
    .catch(function(err){
        return res.status(500).json({ error: "Some error occured while saving sales!" });
    });

});

router.get("/top-five-sales", (req, res)=>{
    SalesModel.find()
    .sort({quantity: -1})
    .limit(5)
    .exec(
        function(error, sales){
            if(error){
                return res.status(500).json({ error: "Some error occured while getting top 5 sales!" });
            }
            return res.status(200).json({"top5Sales": sales}) 
        }
    );
    
});

router.get("/get-todays-revenue", (req, res)=>{
    
    SalesModel.find({
        dateOfSale: {
            $gte: today.toDate(),
            $lte: momentjs(today).endOf('day').toDate()
        }
    }).then((sales)=>{
        let totalRevenueToday = 0;
        for(let i=0; i<sales.length; i++){
            totalRevenueToday = totalRevenueToday + (sales[i].totalAmount * sales[i].quantity);
        }
        return res.status(200).json({"totalRevenueToday": totalRevenueToday}); 
    })
    .catch(function(err){
        return res.status(500).json({ error: "Some error occured while getting revenue for today!" });
    });
});


module.exports = router;