const Product = require('../../models/productModel');

const getLimitPreOrderProducts = async (req, res) => {

    const limit = req.params.limit;

    try {
        const limitProductList = await Product.find({ preOrderAvailable: true }).limit(limit);

        return res.status(200).json({
            success: true,
            message: 'Successfully get limit pre-order products',
            data: limitProductList,
        })
    } catch (error) {

        console.log('Get limit pre-order products error: ', error);
        return res.status(500).json({
            success: false,
            message: 'Interval Server Error !',
            error,
        })
    };

};

module.exports = getLimitPreOrderProducts;

