const productModel = require("../../models/productModel");

const getAllSaleProducts = async (req, res) => {
    try {
        const allProducts = await productModel.find({ onSale: true });
        return res.status(200).json({
            success: true,
            data: allProducts,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        })
    }
};

module.exports = getAllSaleProducts;