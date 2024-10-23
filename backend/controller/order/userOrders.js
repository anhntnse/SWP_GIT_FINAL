const orderModel = require("../../models/orderModel");

async function userOrders(req, res) {
    try {
        const { userId } = req.params; // Retrieve userId from route parameters
        
        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
                error: true,
                success: false,
            });
        }

        const userOrders = await orderModel.find({ userId });

        if (userOrders.length === 0) {
            return res.status(404).json({
                message: "No orders found for this user",
                success: false,
                error: true,
            });
        }

        res.json({
            message: "User orders fetched successfully",
            data: userOrders,
            success: true,
            error: false,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "An error occurred while fetching user orders",
            error: true,
            success: false,
        });
    }
}

module.exports = userOrders;
