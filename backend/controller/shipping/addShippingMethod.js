const shippingModel = require('../../models/shippingModel');

async function addShippingMethod(req, res) {
    const { name, price, estimatedDelivery, minDeliveryDays, maxDeliveryDays } = req.body;

    // Kiểm tra xem tất cả các trường có được cung cấp không
    if (!name || !price || !estimatedDelivery || minDeliveryDays === undefined || maxDeliveryDays === undefined) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        const newMethod = new shippingModel({ 
            name, 
            price, 
            estimatedDelivery, 
            minDeliveryDays, 
            maxDeliveryDays 
        });
        await newMethod.save();
        res.json({ success: true, message: 'Shipping method added successfully' });
    } catch (error) {
        console.error("Error adding shipping method:", error); // In lỗi chi tiết ra console
        res.status(500).json({ success: false, message: 'Failed to add shipping method' });
    }
};

module.exports = addShippingMethod;
