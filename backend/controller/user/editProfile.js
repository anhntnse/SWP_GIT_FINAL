userModel = require('../../models/userModel');

async function editProfileController(req, res) {
    try {

        // Destructure the user ID and the rest of the request body
        const { userId, ...resBody } = req.body;

        // Find and update the user profile
        const updatedUser = await userModel.findByIdAndUpdate(userId, resBody, { new: true }); // Use { new: true } to return the updated document

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        // Send a success response
        res.json({
            message: "Profile updated successfully",
            data: updatedUser,
            success: true,
            error: false
        });

    } catch (err) {
        // Handle errors and respond with an appropriate message
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = editProfileController;