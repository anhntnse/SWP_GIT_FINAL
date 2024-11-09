const orderModel = require("../../models/orderModel");
const productModel = require("../../models/productModel");
const NotificationService = require("../notification/NotificationService");

const updateOrderStatus = async (req, res) => {
    console.log("Updating order status...");
    const { _id, order_status } = req.body;
    console.log("Request Body:", req.body);

    if (!_id || !order_status) {
        return res.status(400).json({ success: false, message: "Invalid data" });
    }

    try {
        console.log("Received data:", { _id, order_status });
        console.log("Attempting to update order with ID:", _id);

        const updatedOrderStatus = await orderModel.findByIdAndUpdate(
            _id,
            { order_status: order_status },
            { new: true }
        );

        if (!updatedOrderStatus) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        // Send notification to the user about the status update
        const userId = updatedOrderStatus.userId; 
        const orderCode = updatedOrderStatus.orderCode;
        const message = `Your order  ${orderCode} status has been updated to ${order_status}`;
        await NotificationService.addNotificationToUser(userId, message);

        return res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            order: updatedOrderStatus,
        });
    } catch (error) {
        console.error('Error updating order:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error. Failed to update order status.',
        });
    }
};

module.exports = updateOrderStatus;
