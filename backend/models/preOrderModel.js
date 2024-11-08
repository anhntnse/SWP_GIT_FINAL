const mongoose = require('mongoose');

const preOrderSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    quantity: {
        type: Number,
        default: 1,
    },
    status: {
        type: String,
        default: 'Pending',
    },
    depositPrice: {
        type: Number,
        default: 0,
    }
},
    {
        timestamps: true,
    });

const preOrderModel = mongoose.model("preOrder", preOrderSchema)

module.exports = preOrderModel;