const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const sendMail = async ({ email, html }) => {

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: '"Thương mại điện tử 👻" <no-reply@Ecommerce.com>', // sender address
        to: email, // list of receivers
        subject: "Forgot Password ✔", // Subject line
        text: "Hello world?", // plain text body
        html: html, // html body
    });

    return info;
};

const forgotPassword = async (req, res) => {

    try {
        // check missing email
        if (!req.body.email) {
            return res.status(400).json({ message: 'Missing email .' });
        }

        // check existing user
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found .' });
        }

        const { email } = req.body;

        // create new token for link
        const newtoken = jwt.sign(
            {
                email
            },
            process.env.TOKEN_SECRET_KEY,
            { expiresIn: "2h" }
        );

        // create html text
        const html = `Xin vui lòng click vào link dưới đây để thay đổi password của bạn. Link này sẽ hết hạn sau 2 tiếng kể từ bây giờ.
        <a href= ${process.env.FRONTEND_URL}/reset-password/${user._id}/${newtoken}>Click here</a>`;

        // send mail 
        const data = {
            email,
            html,
        };

        const rs = await sendMail(data);
        return res.status(200).json({ success: true, rs });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'internal error server .', error });
    }
};



module.exports = forgotPassword;
