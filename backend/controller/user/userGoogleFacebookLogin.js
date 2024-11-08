const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');

const userGoogleFacebookLogin = {
    loginSuccess: async (req, res) => {
        const { id } = req.body;
        if (!id) {
            throw new Error("Not found id !");
        }

        try {
            const user = await User.findOne({ oauthId: id });
            console.log('user', user);
            const tokenData = {
                _id: user._id,
                email: user.email,
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

            const tokenOption = {
                httpOnly: true,
                secure: true
            }

            res.cookie("token", token, tokenOption).status(200).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false
            })
        } catch (err) {
            res.json({
                message: err.message || err,
                error: true,
                success: false,
            })
        }

    }
};

module.exports = userGoogleFacebookLogin;