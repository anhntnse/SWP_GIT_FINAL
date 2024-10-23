const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function changePasswordController(req, res) {
    try {
        const { userId, currentPassword, newPassword } = req.body;
        const token = req.cookies.token;

        if (!token) {
            throw new Error('Unauthorized');
        }

        // Verify JWT
        const user = await userModel.findById(userId);

        console.log("Change password here");
        console.log(user)
        if (!user) {
            throw new Error('User not found');
        }

        // Check if the current password is correct
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            throw new Error('Current password is incorrect');
        }

        // Hash the new password and update
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            message: 'Password changed successfully',
            success: true,
            error: false,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = changePasswordController;
