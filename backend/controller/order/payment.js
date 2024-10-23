// Controller để tạo đơn hàng mới
const payment = async (req, res) => {
    const PayOS = require("@payos/node");

    const payOS = new PayOS(
        process.env.PAYOS_CLIENT_ID,
        process.env.PAYOS_API_KEY,
        process.env.PAYOS_CHECKSUM_KEY
      );
    const body = req.body;
    console.log(body);

  try {
    const paymentLinkResponse = await payOS.createPaymentLink(body);
    console.log(paymentLinkResponse)
    return res.status(200).json({
        status: 'Success',
        url:paymentLinkResponse.checkoutUrl
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
        status: 'Fail',
        message:"Something went wrong: "+error
    });
  }
};

module.exports = payment