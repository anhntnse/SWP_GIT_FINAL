// const Discount = require('../../models/discountModel');

// // Function: Thêm mã giảm giá mới
// async function uploadDiscount(req, res) {
//     const { nameDiscount, codeDiscount, content, value, expirationDate } = req.body;

//     try {
//         const newDiscount = new Discount({
//             nameDiscount,
//             codeDiscount,
//             content,
//             value,
//             expirationDate
//         });
//         await newDiscount.save();

//         return res.status(201).json({
//             data: newDiscount,
//             message: 'Mã giảm giá đã được thêm!',
//             success: true,
//             error: false
//         });
//     } catch (err) {
//         return res.status(400).json({
//             message: err?.message || 'Lỗi khi thêm mã giảm giá',
//             success: false,
//             error: true
//         });
//     }
// }

// module.exports = uploadDiscount;
const Discount = require('../../models/discountModel');

async function uploadDiscount(req, res) {
  const { nameDiscount, codeDiscount, content, value, expirationDate } = req.body;

  // Kiểm tra nếu codeDiscount rỗng
  if (!codeDiscount) {
    return res.status(400).json({
      message: "Code discount is required.",
      success: false,
    });
  }

  try {
    // Kiểm tra nếu mã giảm giá đã tồn tại
    const existingDiscount = await Discount.findOne({ codeDiscount });
    if (existingDiscount) {
      return res.status(400).json({
        message: "Code discount already exists.",
        success: false,
      });
    }

    const newDiscount = new Discount({
      nameDiscount,
      codeDiscount,
      content,
      value,
      expirationDate,
    });

    await newDiscount.save();
    res.status(201).json({
      message: "Discount added successfully!",
      success: true,
      data: newDiscount,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to add discount.",
      success: false,
    });
  }
}

module.exports = uploadDiscount;
