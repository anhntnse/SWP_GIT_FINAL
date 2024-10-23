const orderModel = require("../../models/orderModel")

const updateOrder = async (req, res) => {
    console.log("Updating order...");
    const {_id, status } = req.body;

    // Convert _id to string to ensure it's the correct type
    //_id = String(_id);

    if (!_id || !status) {
        return res.status(400).json({ success: false, message: "Invalid data" });
    }

    try {
        console.log("Received data:", { _id, status });
        console.log("Attempting to update order with ID:", _id);

        const updatedOrder = await orderModel.findByIdAndUpdate(
            _id,
            { status: status || 'Payment successful' },
            { new: true }  // Return the updated document
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            order: updatedOrder,
        });
    } catch (error) {
        console.error('Error updating order:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error. Failed to update order status.',
        });
    }
};

module.exports = updateOrder;
