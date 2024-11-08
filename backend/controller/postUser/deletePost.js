const PostUserModel = require('../../models/postUserModel');

async function deletePost(req, res) {
    try {
        const postId = req.params.id;
        const post = await PostUserModel.findByIdAndDelete(postId);

        if (!post) {
            return res.status(404).json({ message: 'Bài viết không tồn tại.' });
        }

        res.json({ message: 'Bài viết đã được xóa thành công.' });
    } catch (error) {
        console.error("Lỗi khi xóa bài viết:", error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa bài viết.' });
    }
}
module.exports = deletePost