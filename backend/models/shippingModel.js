const mongoose = require('mongoose');

const shippingSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    estimatedDelivery: { type: String, required: true },
    minDeliveryDays: {type: Number, required: true},
    maxDeliveryDays: {type: Number, required:  true}

}, { timestamps: true });

const shippingModel = mongoose.model("shipping", shippingSchema)

module.exports = shippingModel