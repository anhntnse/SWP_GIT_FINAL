const productModel = require('../../models/productModel');

async function updateStockQuantity(req, res) {
    try {

        // Lấy thông tin từ request body
        const { _id, stock_quantity } = req.body;

        // Cập nhật số lượng tồn kho cho sản phẩm
        const updatedProduct = await productModel.findByIdAndUpdate(_id, { stock_quantity }, { new: true });
        console.log("Update stock quantity" + _id + " " + stock_quantity);
        
        // Trả về phản hồi
        res.json({
            message: "Stock quantity updated successfully",
            data: updatedProduct,
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

module.exports = updateStockQuantity;
