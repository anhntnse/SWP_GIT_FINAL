const Product = require('../../models/productModel');
const cartProduct = require('../../models/cartProduct');

const checkOutOfStock = async (req, res) => {

    const userId = req.userId;

    // console.log('user ID: ', userId);

    try {
        const allCartProductOfUser = await cartProduct.find({
            userId: userId
        }).populate("productId");
        let data = [];
        allCartProductOfUser.map(async (item, index) => {
            if (item.quantity > item.productId.stock_quantity) {
                data = [...data, {
                    available: false,
                    message: 'Inavailable',
                    quantityInStock: item.productId.stock_quantity,
                    productName: item.productId.productName,
                }];
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Successfully checked .',
            data: data,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Interval Server Error !',
            error,
        })
    }


};

module.exports = checkOutOfStock;