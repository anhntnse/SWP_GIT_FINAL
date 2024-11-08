const sendMail = require('../../helpers/sendMail');

const sendSuccessPaymentMail = async (req, res) => {

    const { contactEmail, purchasedProducts } = req.body;

    try {
        const html = `Đơn hàng của bạn đã được thanh toán thành công. Đơn hàng của bạn sẽ được vận chuyển tới bạn trong vài ngày tới.
        <p>Sản phẩm đã được thanh toán: </p>
        <ul>
            ${purchasedProducts.map((item, index) => {
            return `<li>${item.productId.productName}</li>`
        })}
        </ul> `;
        await sendMail({ contactEmail, html });
        return res.status(200).json({
            success: true,
            message: 'Sucessfull Send.',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed Send.',
            error,
        })
    }
};

module.exports = sendSuccessPaymentMail;