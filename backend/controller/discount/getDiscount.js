const Discount = require('../../models/discountModel');

// Function: Lấy tất cả mã giảm giá
async function getDiscounts(req, res) {
    try {
        const discounts = await Discount.find(); // Lấy tất cả mã giảm giá

        if (discounts.length === 0) {
            return res.status(404).json({
                message: 'Không có mã giảm giá nào.',
                success: false,
                error: true
            });
        }

        return res.status(200).json({
            data: discounts,
            message: 'Lấy danh sách mã giảm giá thành công!',
            success: true,
            error: false
        });
    } catch (err) {
        return res.status(500).json({
            message: err?.message || 'Lỗi khi lấy danh sách mã giảm giá',
            success: false,
            error: true
        });
    }
}

module.exports = getDiscounts;
