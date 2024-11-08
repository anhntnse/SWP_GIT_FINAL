const PreOrder = require('../../models/preOrderModel');
const payment = require('../../helpers/payment');

const payDepositPreOrderProduct = async (req, res) => {

    const { preOrderId, paymentDetails } = req.body;

    console.log('preOrderId, ', preOrderId);

    try {
        const preOrder = await PreOrder.findById(preOrderId).populate('productId');
        if (!preOrder) {
            return res.status(404).json({
                success: false,
                message: 'Pre-order not found',
            });
        };

        // process pre-order payment
        const body = {
            orderCode: Number(String(Date.now()).slice(-6)),
            amount: Math.ceil(preOrder.productId.sellingPrice / 2),
            description: 'Thanh toan don hang',
            items: [{
                name: String(preOrder.productId.productName),
                quantity: 1,
                price: Math.ceil(preOrder.productId.sellingPrice / 2),
            }],
            returnUrl: `https://swp-git-final.onrender.com/payment/success/${preOrderId}`, // Redirect URL after successful payment
            cancelUrl: `https://swp-git-final.onrender.com/payment/cancel/${preOrderId}`, // Redirect URL after canceled payment
        };

        const paymentLinkResponse = await payment(body);
        return res.status(200).json({
            success: true,
            message: 'Successfully payment link created .',
            url: paymentLinkResponse,
        });

    } catch (error) {
        console.log('Payment link creation error: ', error);
        return res.status(500).json({
            success: false,
            message: 'Interval Server Error !',
            error: error,
        });
    };
};

module.exports = payDepositPreOrderProduct;