const orderModel = require("../../models/orderModel");
const productModel = require("../../models/productModel"); // Add product model
const NotificationService = require("../notification/NotificationService"); // Import NotificationService

const updateOrder = async (req, res) => {
  console.log("Updating order...");
  const { _id, status } = req.body;

  if (!_id || !status) {
    return res.status(400).json({ success: false, message: "Invalid data" });
  }

  try {
    console.log("Received data:", { _id, status });
    console.log("Attempting to update order with ID:", _id);

    const updatedOrder = await orderModel.findByIdAndUpdate(
      _id,
      { status: status || "Payment successful" },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // If status is "Payment successful", update stock quantities

    for (const product of updatedOrder.products) {
      const { product_id, quantity } = product;

      // Find the product and update its stock and sold quantity
      await productModel.findByIdAndUpdate(product_id, {
        $inc: {
          stock_quantity: -quantity,
          sold_quantity: quantity,
        },
      });
    }

    // Send notification to the user about the status update
    const userId = updatedOrder.userId;
    const orderCode = updatedOrder.orderCode;
    const message = `Your order status ${orderCode} has been updated to ${status}`;
    await NotificationService.addNotificationToUser(userId, message);

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Failed to update order status.",
    });
  }
};

module.exports = updateOrder;
