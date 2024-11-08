const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const resetPassword = async (req, res) => {

    try {
        const id = req.params.id;
        const token = req.params.token;
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decodedInfo) => {
            if (err) {
                res.json({ success: false, message: "Token is expired ." });
            }
            else {
                if (!req.body.password) {
                    return res.status(400).json({ success: false, message: 'Missing password .' });
                }

                const updatePassword = async () => {
                    try {
                        const { password } = req.body;
                        const salt = await bcrypt.genSalt(10);
                        const hashedPassword = await bcrypt.hash(password, salt);
                        const user = await userModel.findByIdAndUpdate({ _id: id }, { password: hashedPassword });
                        return res.status(200).json({ success: true, user, message: 'Successful Reset Password .' });
                    } catch (error) {
                        console.log(error)
                        return res.status(500).json({ success: false, message: 'internal error server .', error });
                    }
                }

                updatePassword();
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'internal error server .' });
    }

};

module.exports = resetPassword;