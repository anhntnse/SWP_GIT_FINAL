const productModel = require("../../models/productModel");

const getBestSellerProducts = async (req, res) => {
    try {
        // Lấy 12 sản phẩm bestseller, sắp xếp theo sellAmount
        const bestSellerProducts = await productModel.find().sort({ sold_quantity: -1 }).limit(12);

        res.json({
            message: "Best seller products",
            data: bestSellerProducts,
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = getBestSellerProducts;
