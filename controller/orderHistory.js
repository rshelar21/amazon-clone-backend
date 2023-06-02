const userModel = require("../models/userModel");
const productModel = require("../models/orderModel")



const orderData = async(req, res) => {
    const {id} = req.body;
   
    try {
        const product = await productModel.find({userId : id})
        console.log(product)
        if(!product) return res.status(400).json({message : "No product found", result : false})
        res.status(200).json({product, result : true, message : "Product found"})
    } catch (error) {
        res.status(500).json({message : "Something went wrong", result : false})
    }

}


module.exports = {orderData}