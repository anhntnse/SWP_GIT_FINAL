const PostUserModel = require('../../models/postUserModel');
const User = require('../../models/userModel');

// Hàm tạo bài viết mới
async function createPost(req, res) {
    try {
        const { name, description, price, imageUrl, condition, address, phoneNumber, contactInfo } = req.body;

        // Lấy userId từ token hoặc yêu cầu
        const userId = req.user._id; // Giả sử userId được lưu trong req.user sau khi xác thực

        // Kiểm tra userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại.' });
        }

        const newPost = new PostUserModel({
            name,
            description,
            price,
            imageUrl,
            condition,
            address,
            phoneNumber,
            contactInfo,
            userId,
            status: 'pending' // Trạng thái mặc định là pending
        });

        await newPost.save();
        res.status(201).json({ message: 'Bài viết đã được đăng và chờ phê duyệt.', post: newPost });
    } catch (error) {
        console.error("Lỗi khi tạo bài viết:", error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi tạo bài viết.', error: error.message });
    }
}

module.exports = createPost;
