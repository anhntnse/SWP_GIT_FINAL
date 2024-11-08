const PreOrder = require('../../models/preOrderModel');
const Product = require('../../models/productModel');

const preorderProduct = async (req, res) => {

    const userId = req.userId;
    const { productId } = req.body;

    try {

        const product = await Product.findById({ _id: productId });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found !',
            });
        };

        if (!product.preOrderAvailable) {
            return res.status(400).json({
                success: false,
                message: 'Pre-orders are not available for this product',
            });
        };

        const preOrderProduct = new PreOrder({
            productId,
            userId,
            quantity: 1,
            depositPrice: Math.ceil(product.sellingPrice * 50 / 100),
        });

        await preOrderProduct.save();

        res.status(200).json({
            success: true,
            message: 'Pre-order placed successfully',
            data: preOrderProduct,
        });
    } catch (error) {
        console.log('Pre-order product error: ', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to place pre-order',
            error: error,
        })

    };

};

module.exports = preorderProduct;