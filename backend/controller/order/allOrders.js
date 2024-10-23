const orderModel = require("../../models/orderModel")

async function allOrders(req,res){
    try{

        const allOrders = await orderModel.find()
        
        res.json({
            message : "All User ",
            data : allOrders,
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = allOrders