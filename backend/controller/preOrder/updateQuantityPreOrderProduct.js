const Product = require('../../models/productModel');

const updateQuantityPreOrderProduct = async (req, res) => {

    const { productId, quantity } = req.body;

    try {
        const preOrderProduct = await Product.findOne({ _id: productId });
        if (quantity > preOrderProduct.stockForPreOrder) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Quantity Input !',
                data: quantity,
            })
        } else {
            const updatedPreOrderProduct = await Product.findByIdAndUpdate({
                _id: productId,
            }, {
                stockForPreOrder: preOrderProduct.stockForPreOrder - quantity,
            }, {
                new: true,
            });

            return res.status(200).json({
                success: true,
                message: 'Successfully updated pre-order product quanity .',
                data: updatedPreOrderProduct,
            });
        }
    } catch (error) {
        console.log('Update pre-order product quantity error: ', error);
        return res.status(500).json({
            success: false,
            message: 'Interval Server Error !',
            error,
        })
    }
};

module.exports = updateQuantityPreOrderProduct;