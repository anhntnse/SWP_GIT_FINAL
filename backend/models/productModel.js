const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName : String,
    stock_quantity: {
        type: Number,
        default: 0 // Thêm default value nếu bạn muốn
    },
    sold_quantity: {
        type: Number,
        default: 0 // Thêm default value nếu bạn muốn
    },
    brandName : String,
    category : String,
    productImage : [],
    description : String,
    price : Number,
    sellingPrice : Number,
    onSale: {
        type: Boolean,
        default: false // Default to false, meaning not on sale
    }
},{
    timestamps : true
})


const productModel = mongoose.model("product",productSchema)

module.exports = productModel