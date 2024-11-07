const shippingModel = require('../../models/shippingModel');

async function updateShippingMethod(req, res) {
    const { _id, name, price, estimatedDelivery, minDeliveryDays, maxDeliveryDays } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!name || price === undefined || !estimatedDelivery || minDeliveryDays === undefined || maxDeliveryDays === undefined) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    console.log("Id Shipping Method: " + _id + " " + name + " ");
    try {
        const updatedMethod = await shippingModel.findByIdAndUpdate(_id, { 
            name, 
            price, 
            estimatedDelivery, 
            minDeliveryDays, 
            maxDeliveryDays 
        }, { new: true }); // `new: true` để trả về tài liệu đã cập nhật

        if (!updatedMethod) {
            return res.status(404).json({ success: false, message: 'Shipping method not found' });
        }

        res.json({ success: true, message: 'Shipping method updated successfully' });
    } catch (error) {
        console.error("Error updating shipping method:", error); // In lỗi chi tiết ra console
        res.status(500).json({ success: false, message: 'Failed to update shipping method' });
    }
};

module.exports = updateShippingMethod;
