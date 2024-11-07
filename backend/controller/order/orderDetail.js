const orderModel = require("../../models/orderModel");

async function orderDetail(req, res) {
  const orderId = req.params.orderId;

    if (!orderId) {
        return res.status(400).json({
            success: false,
            message: "Order ID is required",
        });
    }

    try {
        console.log("Fetching order details for order ID:", orderId);

        // Fetch the order details using the orderId
        const orderDetail = await orderModel.findById(orderId).populate('products'); // Adjust based on your schema

        if (!orderDetail) {
            return res.status(404).json({
                success: false,
                message: "No order found with this ID",
            });
        }

        return res.status(200).json({
            success: true,
            data: orderDetail,
        });
    } catch (error) {
        console.error("Error fetching order details:", error);
        return res.status(500).json({
            success: false,
            message: "Server error. Failed to fetch order details.",
        });
    }
};

module.exports = orderDetail;
