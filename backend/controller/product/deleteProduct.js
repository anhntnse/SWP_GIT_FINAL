const productModel = require('../../models/productModel');

async function deleteProduct(req, res) {
    try {
        const { productId } = req.params;

        // Xóa sản phẩm
        const deletedProduct = await productModel.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false,
            });
        }

        // Trả về phản hồi
        res.json({
            message: "Product deleted successfully",
            data: deletedProduct,
            success: true,
            error: false,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = deleteProduct;
