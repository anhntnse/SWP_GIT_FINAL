// controllers/postController.js
const PostUser = require('../../models/postUserModel');


async function updateStatus(req, res) {
    try {
        const { postId } = req.params; // Lấy postId từ tham số URL
        const { status } = req.body; // Lấy status mới từ body

        // Kiểm tra xem `status` có hợp lệ hay không
        if (!['pending', 'approved', 'blocked'].includes(status)) {
            return res.status(400).json({ message: 'Trạng thái không hợp lệ.' });
        }

        // Tìm bài viết và cập nhật `status`
        const post = await PostUser.findByIdAndUpdate(
            postId,
            { status },
            { new: true } // Trả về bài viết đã cập nhật
        );

        if (!post) {
            return res.status(404).json({ message: 'Bài viết không tồn tại.' });
        }

        res.json({ message: 'Cập nhật trạng thái thành công.', post });
    } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật trạng thái.' });
    }
}

module.exports = updateStatus 
