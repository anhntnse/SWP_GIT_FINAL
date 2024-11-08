// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');

// const authenticate = async (req, res, next) => {
//     const token = req.cookies.token || req.headers['authorization'].split(' ')[1];
    
//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
//         req.user = await User.findById(decoded._id); // Giả sử _id là trường ID của người dùng
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: 'Invalid token', error: error.message });
//     }
// };

// module.exports = authenticate;


const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Điều chỉnh đường dẫn nếu cần

const authenticate = async (req, res, next) => {
    try {
        // Lấy token từ cookie hoặc tiêu đề xác thực
        const token = req.cookies.token || (req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null);

        // Kiểm tra xem token có tồn tại không
        if (!token) {
            return res.status(401).json({ message: 'Truy cập bị từ chối. Không có token cung cấp.' });
        }

        // Xác minh token
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.user = await User.findById(decoded._id).select('-password'); // Chọn người dùng không bao gồm mật khẩu

        next(); // Tiếp tục đến middleware hoặc route handler tiếp theo
    } catch (err) {
        console.error("Lỗi xác thực:", err);
        res.status(400).json({ message: 'Token không hợp lệ.' });
    }
};

module.exports = authenticate;
