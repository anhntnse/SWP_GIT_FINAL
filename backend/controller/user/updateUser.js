const userModel = require("../../models/userModel");

async function updateUser(req, res) {
    try {
        const sessionUser = req.userId;
        const { userId, email, name, role, profilePic } = req.body;

        // Create payload for the fields that are going to be updated
        const payload = {
            ...(name && { name: name }),
            ...(role && { role: role }),
            ...(profilePic && { profilePic: profilePic }),
        };

        const user = await userModel.findById(sessionUser);
        console.log("user.role", user.role);

        // Check if the email is provided in the request body
        if (email) {
            // Check if the email is already in use by another user
            const emailExists = await userModel.findOne({ email });
            if (emailExists && emailExists._id.toString() !== userId) {
                return res.status(400).json({
                    message: "Email is already in use by another account",
                    success: false,
                    error: true,
                });
            } else {
                // Add email to payload if it's not taken
                payload.email = email;
            }
        }

        // Update the user with the provided details
        const updatedUser = await userModel.findByIdAndUpdate(userId, payload, { new: true });

        res.json({
            data: updatedUser,
            message: "User updated successfully",
            success: true,
            error: false,
        });
    } catch (err) {
        if (err.code === 11000) {
            // Handle duplicate key error (unique constraint violation)
            return res.status(400).json({
                message: "Duplicate email detected. Please use a different email.",
                error: true,
                success: false,
            });
        }

        // General error handling for other cases
        res.status(400).json({
            message: "An error occurred while updating the user.",
            error: true,
            success: false,
        });
    }
}

module.exports = updateUser;
