const shippingModel = require('../../models/shippingModel');

async function deleteShippingMethod(req, res) {
    try {
        await shippingModel.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Shipping method deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete shipping method' });
    }
};

module.exports = deleteShippingMethod;
