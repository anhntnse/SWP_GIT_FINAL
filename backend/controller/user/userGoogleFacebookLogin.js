const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');

const userGoogleFacebookLogin = {
    loginSuccess: async (req, res) => {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                message: "ID not provided!",
                error: true,
                success: false,
            });
        }

        try {
            const user = await User.findOne({ oauthId: id });
            if (!user) {
                return res.status(404).json({
                    message: "User not found!",
                    error: true,
                    success: false,
                });
            }

            const tokenData = {
                _id: user._id,
                email: user.email,
            };
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: "8h" });

            const tokenOption = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Set secure based on environment
                sameSite: "strict",
            };

            res.cookie("token", token, tokenOption).status(200).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false,
            });
        } catch (err) {
            res.status(500).json({
                message: err.message || "An error occurred during login.",
                error: true,
                success: false,
            });
        }
    }
};

module.exports = userGoogleFacebookLogin;
