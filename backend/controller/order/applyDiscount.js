const Discount = require('../../models/discountModel');

const applyDiscount = async (req, res) => {

    const { couponCode } = req.body;

    try {
        const discount = await Discount.findOne({ codeDiscount: couponCode });
        // if (!discount) {
        //     return res.json({
        //         message: 'Not Found Discount !',
        //     })
        // }
        return res.status(200).json({
            success: true,
            message: '',
            data: discount,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Interval Server Error !',
            error: error,
        });
    }

};

module.exports = applyDiscount;