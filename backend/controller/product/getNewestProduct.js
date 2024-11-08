const productModel = require("../../models/productModel");

const getNewestProduct = async (req, res) => {
    try {
        // Lấy 12 sản phẩm mới nhất, sắp xếp theo thời gian tạo (createdAt)
        const newestProducts = await productModel.find().sort({ createdAt: -1 }).limit(12);

        res.json({
            message: "Newest products",
            data: newestProducts,
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

module.exports = getNewestProduct;
