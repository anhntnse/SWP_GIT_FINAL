const productModel = require('../../models/productModel');
const addToCartModel = require('../../models/cartProduct'); // Import addToCart model

async function deleteProduct(req, res) {
    try {
        const { productId } = req.params;

        // Delete the product
        await addToCartModel.deleteMany({ productId: null });

        // Remove items from carts where the productId does not exist in the product collection
        await addToCartModel.deleteMany({
            productId: { $nin: await productModel.find().distinct('_id') }
        });

        const deletedProduct = await productModel.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false,
            });
        }

        // Remove the deleted product from all user carts

        // Respond to the client
        res.json({
            message: "Product deleted successfully and removed from all user carts",
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
