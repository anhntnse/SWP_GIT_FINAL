const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true }, // URL hoặc đường dẫn tới ảnh bài viế // Trạng thái chặn bài viết
    condition: { type: String, required: true }, // Tình trạng sản phẩm (Mới/Cũ)
    address: { type: String }, // Địa chỉ liên hệ
    phoneNumber: { type: String }, // Số điện thoại liên hệ
    contactInfo: { type: String }, // Thông tin liên hệ khác
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'blocked'], // Chỉ chấp nhận 3 giá trị này
        default: 'pending' // Giá trị mặc định là "pending"
    }
});

module.exports = mongoose.model('PostUser', postUserSchema);
