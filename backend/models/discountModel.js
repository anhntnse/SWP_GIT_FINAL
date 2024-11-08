// const mongoose = require('mongoose');

// const discountSchema = new mongoose.Schema({
//     nameDiscount: { type: String, required: true },      // Tên mã giảm giá
//     codeDiscount: { type: String, sparse: true, unique: true }, // Mã code giảm giá
//     content: { type: String, required: true },           // Nội dung mô tả mã giảm giá
//     value: { type: Number, required: true },          // Phần trăm giảm giá
//     expirationDate: { type: Date, required: true }       // Ngày hết hạn
// });

// module.exports = mongoose.model('Discount', discountSchema);
const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    nameDiscount: { type: String, required: true, trim: true,},      // Tên mã giảm giá
    codeDiscount: { type: String, required: true, trim: true, sparse: true }, // Mã code giảm giá
    content: { type: String, required: true, trim: true,},           // Nội dung mô tả mã giảm giá
    value: { type: String, required: true, trim: true, },          // Phần trăm giảm giá
    expirationDate: { type: Date, required: true }       // Ngày hết hạn
});

module.exports = mongoose.model('Discount', discountSchema);
