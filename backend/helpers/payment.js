
const payment = async (body) => {

    const PayOS = require("@payos/node");

    const payOS = new PayOS(
        process.env.PAYOS_CLIENT_ID,
        process.env.PAYOS_API_KEY,
        process.env.PAYOS_CHECKSUM_KEY
    );
    // const body = req.body;
    // console.log(body);
    console.log('body: ', body);

    try {
        const paymentLinkResponse = await payOS.createPaymentLink(body);
        // console.log(paymentLinkResponse)
        // console.log('paymentLinkResponse', paymentLinkResponse);
        return paymentLinkResponse.checkoutUrl;
    } catch (error) {
        console.error(error);
    }
};

module.exports = payment;