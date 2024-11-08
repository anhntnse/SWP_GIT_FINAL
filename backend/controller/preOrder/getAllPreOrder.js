const PreOrder = require('../../models/preOrderModel');

const getAllPreOrder = async (req, res) => {

    try {
        const allPreOrder = await PreOrder.find().populate('productId').populate('userId');
        return res.status(200).json({
            success: true,
            message: 'Successfully get all Pre-order .',
            data: allPreOrder,
        })
    } catch (error) {
        console.log('Get all Pre-order error: ', error);
        return res.status(500).json({
            success: false,
            message: 'Interval Server Error !',
            error,
        })
    }
};

module.exports = getAllPreOrder;