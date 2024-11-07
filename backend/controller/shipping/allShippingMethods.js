const shippingModel = require('../../models/shippingModel');

async function allShippingMethods(req, res) {
    try {
        const methods = await shippingModel.find();
        res.json({ success: true, data: methods });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch shipping methods' });
    }
};

module.exports = allShippingMethods;
