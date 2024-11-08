const PreOrder = require('../../models/preOrderModel');
const Product = require('../../models/productModel');

const createAPreOrderProduct = async (req, res) => {

    const {
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

        const newPreOrderProduct = await Product.create({
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
        });

        return res.status(200).json({
            success: true,
            message: 'Successfully create a pre-order product',
            data: newPreOrderProduct,
        })
    } catch (error) {

        console.log('pre-order create error: ', error);
        return res.status(500).json({
            success: false,
            message: 'Interval Server Error !',
            error: error,
        });
    }
};

module.exports = createAPreOrderProduct;
