const productModel = require("../../models/productModel");

const deleteSaleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        daletedProduct = await productModel.findByIdAndUpdate({ _id: id }, { salePrice: null, expDate: null, onSale: false, }, { new: true });
        return res.status(200).json({
            success: true,
            data: 'Successfully Deleted .',
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
            message: 'Failed Deleted !'
        })
    }
};

module.exports = deleteSaleProduct;