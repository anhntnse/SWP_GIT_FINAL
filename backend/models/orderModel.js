const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userId: { type: String, ref: "User" },
    orderCode: {
      type: Number,
      unique: true,
    },

    products: [
      {
        product_id: { type: String, ref: "Product" },
        productName: { type: String },
        quantity: { type: Number, required: true },
        price_per_item: { type: Number, required: true },
      },
    ],
    shipping_address: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String },
      phone: { type: String },
    },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "pending" },
    order_status: { type: String, default: "pending" },
    shippingMethod: {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      estimatedDelivery: { type: String, required: true },
      minDeliveryDays: { type: Number, required: true },
      maxDeliveryDays: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
