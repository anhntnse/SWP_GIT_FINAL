const productModel = require("../../models/productModel");

const getLimitSaleProduct = async (req, res) => {
    try {
        const onSaleProducts = await productModel.find({ onSale: true }).limit(4);
        const limitOnSaleProducts = onSaleProducts.filter((item, index) => {
            return item?.expDate.getTime() > Date.now();
        })
        return res.status(200).json({
            success: true,
            data: limitOnSaleProducts,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        })
    }
};

module.exports = getLimitSaleProduct;
// const productModel = require("../../models/productModel");

// const getLimitSaleProduct = async (req, res) => {
//     try {
//         // Fetch only necessary fields and filter expired products in the database query itself for better performance
//         const onSaleProducts = await productModel
//             .find({ onSale: true, expDate: { $gt: new Date() } }) // Filter in DB
//             .limit(4)
//             .select('_id productName productImage salePrice sellingPrice category'); // Select only necessary fields

//         if (onSaleProducts.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'No on-sale products available.',
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             data: onSaleProducts,
//         });
//     } catch (error) {
//         console.error('Error fetching products:', error); // Optional: log the error for debugging
//         return res.status(500).json({
//             success: false,
//             message: 'An error occurred while fetching on-sale products.',
//             error: error.message,
//         });
//     }
// };

// module.exports = getLimitSaleProduct;
