const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
    try {
        const { productId } = req.body;
        const currentUser = req.userId;

        // Check if the product is already in the user's cart
        const existingProduct = await addToCartModel.findOne({
            productId,
            userId: currentUser, // Ensure you are checking against the current user
        });

        if (existingProduct) {
            // Increase quantity if product already exists in the cart
            existingProduct.quantity += 1;
            const updatedProduct = await existingProduct.save();

            return res.json({
                data: updatedProduct,
                message: "Product quantity updated in cart",
                success: true,
                error: false
            });
        } else {
            // Add new product if it does not exist in the cart
            const payload = {
                productId: productId,
                quantity: 1,
                userId: currentUser,
            };

            const newAddToCart = new addToCartModel(payload);
            const saveProduct = await newAddToCart.save();

            return res.json({
                data: saveProduct,
                message: "Product added to cart",
                success: true,
                error: false
            });
        }
    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = addToCartController;
