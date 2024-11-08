// controllers/postController.js
const PostUserModel = require('../../models/postUserModel');
const User = require('../../models/userModel');


// Hàm lấy tất cả bài viết, bao gồm thông tin người dùng
async function getAllPosts(req, res) {
    try {
        const posts = await PostUserModel.find({});
        res.json(posts);
    } catch (error) {
        console.error("Lỗi khi lấy tất cả bài viết:", error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy danh sách bài viết.' });
    }
}



module.exports = getAllPosts