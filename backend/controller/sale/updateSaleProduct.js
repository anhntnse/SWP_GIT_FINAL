const productModel = require("../../models/productModel");

const updateSaleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await productModel.findByIdAndUpdate({ _id: id }, { salePrice: req.body?.salePrice, expDate: req.body?.expDate }, { new: true });
        return res.status(200).json({
            success: true,
            data: updatedProduct,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        })
    }
}

module.exports = updateSaleProduct;