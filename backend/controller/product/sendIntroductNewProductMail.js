const User = require('../../models/userModel');
const sendMail = require('../../helpers/sendMail');
const emailExistence = require('email-existence');

const sendIntroductNewProductMail = async (req, res) => {

    const informationProduct = req.body.data;

    console.log('informationProduct ', informationProduct);

    try {
        const users = await User.find({ role: 'GENERAL' });

        // const users = ['testuser@gmail.com', 'sangtruong@gmail.com', 'truongdinhsang@gmail.com'];

        users.map(async (user) => {
            let flag;
            await emailExistence.check(user.email, async (error, response) => {
                // console.log(error);
                if (error !== null) {
                    return res.status(500).json({
                        error,
                    });
                }
                else if (response === true) {
                    // console.log('response ', response);
                    // flag = response;
                    // console.log('flag ', flag);
                    const html = `
                    <h1>New Product Introduction</h1>
                    <p>Hello ${user.name && user.name}, </p>
                    <p>Our website has new products. Please see details here.</p>
                    <a href= ${process.env.FRONTEND_URL}/product/${informationProduct._id}>Click here</a>;
                    `;
                    const data = {
                        email: user.email,
                        html,
                    }
                    await sendMail(data);
                }
            });

            // console.log('flag', flag);
            // if (flag === true) {
            //     const html = `
            //         <h1>New Product Introduction</h1>
            //         <p>Hello ${user.name}, </p>
            //         <p>Our website has new products. Please see details here.</p>
            //         <a href= ${process.env.FRONTEND_URL}/product/${informationProduct}>Click here</a>;
            //         `;
            //     const data = {
            //         email: user.email,
            //         html,
            //     }
            //     await sendMail(data);
            // }
        });

        // await emailExistence.check('testuser1@gmail.com', (error, response) => {
        //     if (error) {
        //         return res.json(error);
        //     }

        //     return res.json(response);
        // });

        return res.status(200).json({
            success: true,
            message: 'Success sent .',
        });
    } catch (error) {
        console.log('error :', error);
        res.status(500).json({
            success: false,
            message: 'Failed sent .',
            error,
        })
    };

};

module.exports = sendIntroductNewProductMail;