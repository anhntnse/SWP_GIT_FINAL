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

    try {
        await transporter.sendMail({
            from: '"Thương mại điện tử 👻" <no-reply@Ecommerce.com>', // sender address
            to: email, // list of receivers
            subject: "Forgot Password ✔", // Subject line
            text: "Hello world?", // plain text body
            html: html, // html body
        });
    } catch (error) {
        console.log('Failed sent mail: ', error);
    }
};

module.exports = sendMail;