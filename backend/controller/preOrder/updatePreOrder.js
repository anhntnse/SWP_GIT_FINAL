const PreOrder = require('../../models/preOrderModel');

const updatePreOrder = async (req, res) => {

    const { preOrderId, status } = req.body;

    try {
        const updatedPreOrder = await PreOrder.findByIdAndUpdate(
            { _id: preOrderId },
            { status: status },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: 'Successfully PreOrder Updated .',
            data: updatedPreOrder,
        })

    } catch (error) {
        console.log('PreOrder Update Error: ', error);
        return res.status(500).json({
            success: false,
            message: 'Interval Server Error !',
            error,
        });
    }

};

module.exports = updatePreOrder;