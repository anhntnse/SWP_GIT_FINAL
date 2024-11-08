const productModel = require("../../models/productModel");

const addSaleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { salePrice, expDate } = req.body;
        updatedProduct = await productModel.findByIdAndUpdate({ _id: id }, { salePrice: salePrice, expDate: expDate, onSale: true }, { new: true });
        return res.status(200).json({
            success: true,
            data: updatedProduct,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
}

module.exports = addSaleProduct;