const Product = require('../../models/productModel');
const PreOrder = require('../../models/preOrderModel');

const getAllPreOrderProducts = async (req, res) => {

    // try {
    //     const allPreOrderProducts = await PreOrder.find().populate('productId').populate('userId');

    //     return res.status(200).json({
    //         success: true,
    //         message: 'Successfully get all pre-order products.',
    //         data: allPreOrderProducts,
    //     })
    // } catch (error) {
    //     console.log('get all pre-order products error: ', error);
    //     return res.status(500).json({
    //         success: false,
    //         message: 'Interval Server Error.',
    //         error: error,
    //     })
    // }

    try {
        const allPreOrderProduct = await Product.find({ preOrderAvailable: true });

        return res.status(200).json({
            success: true,
            message: 'Successfully get all pre-order products .',
            data: allPreOrderProduct,
        })
    } catch (error) {
        console.log('Get all pre-order products error: ', error);
        return res.status(500).json({
            success: false,
            message: 'Interval Server Error',
            error,
        });
    };
};

module.exports = getAllPreOrderProducts;