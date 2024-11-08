const Product = require('../../models/productModel');

const updatePreOrderProduct = async (req, res) => {

    const {
        productId,

        productName,
        productBrand,
        productCategory,
        productImage,
        productPrice,
        productSellingPrice,
        productDescription,
        productReleaseDate,
        productStockForPreOrder,
        productStock,
    } = req.body;

    try {
        if (new Date(productReleaseDate).getTime() <= Date.now()) {
            return res.status(401).json({
                success: false,
                message: 'Invalid release date !',
            })
        };

        const updatedProduct = await Product.findByIdAndUpdate({
            _id: productId,
        }, {
            productName: productName,
            brandName: productBrand,
            category: productCategory,
            productImage: productImage,
            description: productDescription,
            price: productPrice,
            sellingPrice: productSellingPrice,
            preOrderAvailable: true,
            releaseDate: productReleaseDate,
            stockForPreOrder: productStockForPreOrder,
            stock_quantity: productStock,
        }, {
            new: true,
        });

        return res.status(200).json({
            success: true,
            message: 'Successfully update pre-order product .',
            data: updatedProduct,
        })
    } catch (error) {
        console.log('pre-order update error: ', error);
        return res.status(500).json({
            success: false,
            message: 'Interval Server Error !',
            error: error,
        })
    }
};

module.exports = updatePreOrderProduct;

