const express = require('express')
const passport = require('passport')
const router = express.Router()
const authenticate = require('../middleware/authenticate');

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const updateOrder = require('../controller/order/updateOrder')
const createOrder = require('../controller/order/createOrder')
const payment = require('../controller/order/payment')
const allOrders =  require('../controller/order/allOrders')
const uploadNewsController = require('../controller/newPage/uploadNews')
const allNews = require('../controller/newPage/allNews')
const getNewsDetails = require('../controller/newPage/getNewsDetails')
const editProfileController = require('../controller/user/editProfile')
const changePasswordController = require('../controller/user/changePasswordController')
const forgotPassword = require('../controller/user/userForgotPassword');
const resetPassword = require('../controller/user/userResetPassword');
const userGoogleFacebookLogin = require('../controller/user/userGoogleFacebookLogin');
const uploadDiscount =   require('../controller/discount/uploadDiscount');
const getDiscount =   require('../controller/discount/getDiscount');
const getallReviews = require('../controller/review/getReview')
const {
    addReview,
    getAllReviews
} = require('../controller/review/reviewProduct');
const { getReviews } = require('../controller/review/reviewProduct');
const getNewestProducts = require('../controller/product/getNewestProduct');
const updateOrderStatus  = require('../controller/order/updateOrderStatus');
const getBestSellerProducts = require('../controller/product/getBestSellerProducts');
const addSaleProduct = require('../controller/sale/addSaleProduct');
const getAllSaleProducts = require('../controller/sale/getAllSaleProducts');
const updateSaleProduct = require('../controller/sale/updateSaleProduct');
const deleteSaleProduct = require('../controller/sale/deleteSaleProduct');
const getLimitSaleProduct = require('../controller/sale/getLimitSaleProduct');
const createPostUser =  require('../controller/postUser/createPost');
const updateStatus  = require('../controller/postUser/updateStatus');
const deletePost = require("../controller/postUser/deletePost");
const getAllPost = require("../controller/postUser/PostUser");
const sendIntroductNewProductMail = require('../controller/product/sendIntroductNewProductMail');
const checkOutOfStock = require('../controller/product/checkOutOfStock');
const applyDiscount = require('../controller/order/applyDiscount');
const createAPreOrderProduct = require('../controller/preOrder/createAPreOrderProduct');
const getAllPreOrderProducts = require('../controller/preOrder/getAllPreOrderProducts');
const getLimitPreOrderProducts = require('../controller/preOrder/getLimitPreOrderProducts');
const preorderProduct = require('../controller/preOrder/preorderProduct');
const payDepositPreOrderProduct = require('../controller/preOrder/payDepositPreOrderProduct');
const updatePreOrder = require('../controller/preOrder/updatePreOrder');
const getAllPreOrder = require('../controller/preOrder/getAllPreOrder');
const updateQuantityPreOrderProduct = require('../controller/preOrder/updateQuantityPreOrderProduct');
const updatePreOrderProduct = require('../controller/preOrder/updatePreOrderProduct');
const sendSuccessPaymentMail = require('../controller/order/sendSuccessPaymentMail');
const sendIntroductNewDiscountMail = require('../controller/discount/sendIntroductNewDiscountMail');
const notificationController = require('../controller/notification/NotificationController');
const notificationService = require('../controller/notification/NotificationService');
const deleteUserController = require('../controller/user/deleteUsers'); 

const orderDetail = require('../controller/order/orderDetail')
const addShippingMethod = require('../controller/shipping/addShippingMethod');
const allShippingMethods = require('../controller/shipping/allShippingMethods');
const updateShippingMethod = require('../controller/shipping/updateShippingMethod');
const deleteShippingMethod = require('../controller/shipping/deleteShippingMethod');
const updateStockQuantity = require('../controller/product/updateStockQuantity');
const deleteProduct = require('../controller/product/deleteProduct')
const revenueSummary = require('../controller/order/revenueSummary')
const userOrders =  require('../controller/order/userOrders')

router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);

// Google login
router.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['profile', 'email'],
        session: false,
    }
    ));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/', session: false }),
    (req, res) => {
        // console.log('user: ', req.user);
        res.redirect(`${process.env.FRONTEND_URL}/login-success/${req.user?.id}`);
    });
    // facebook login
router.get('/auth/facebook',
    passport.authenticate('facebook', {
        session: false,
        authType: 'rerequest',
        scope: ['email']
    }));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: `${process.env.FRONTEND_URL}/login`, session: false }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect(`${process.env.FRONTEND_URL}/login-success/${req.user?.id}`);
    });


//login success
router.post('/login-success', userGoogleFacebookLogin.loginSuccess);

//admin panel 
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)
router.delete('/delete-user/:userId', authToken, deleteUserController);

//new
router.post("/upload-news",uploadNewsController)
router.get("/get-news",authToken,allNews)
router.post("/news-details",getNewsDetails)

//discount
router.post("/upload-discount",uploadDiscount)
router.get("/get-discount",getDiscount)
router.post("/send-introduct-new-discount-mail", sendIntroductNewDiscountMail)
router.post("/apply-discount", applyDiscount)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)
router.get("/get-newestProduct", getNewestProducts)
router.put("/updatestatus-order/:orderId", updateOrderStatus)
router.get("/best-seller-products", getBestSellerProducts)
router.post("/introduct-new-product-mail", sendIntroductNewProductMail)
router.post("/check-out-of-stock", authToken, checkOutOfStock)
router.post("/delete-product/:productId", authToken, deleteProduct);


//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

///postuser ;
router.post("/createPost",authenticate, createPostUser)
router.put("/postUser/:postId/status", updateStatus)
router.delete("/deletePost/:id", deletePost)
router.get("/getAllPost", getAllPost)

//update order
router.post("/update-order", authToken, updateOrder);
router.post("/create-order", authToken, createOrder);
router.get("/all-order", authToken, allOrders)
router.get("/user-order/:userId", authToken, userOrders);

// payment
router.post("/create-payment-link", authToken, payment);

//user panel
router.post("/edit-profile", editProfileController)
router.post("/change-password", changePasswordController)
router.get("/order-detail/:orderId", authToken, orderDetail);

//onSale
router.post("/add-sale-product/:id", addSaleProduct);
router.get("/get-all-sale-products", getAllSaleProducts);
router.get("/get-limit-sale-products", getLimitSaleProduct);
router.put("/update-sale-product/:id", updateSaleProduct);
router.delete("/delete-sale-product/:id", deleteSaleProduct);

//preOrder
router.post("/create-pre-order-product", createAPreOrderProduct);
router.get("/get-all-pre-order-product", getAllPreOrderProducts);

//preOrder
router.post("/create-pre-order-product", authToken, createAPreOrderProduct);
router.get("/get-all-pre-order-product", getAllPreOrderProducts);
router.get("/get-limit-pre-order-product/:limit", getLimitPreOrderProducts);
router.post("/pre-order-product", authToken, preorderProduct);
router.post("/pay-deposit-pre-order-product", authToken, payDepositPreOrderProduct);
router.put("/update-pre-order", authToken, updatePreOrder);
router.get("/get-all-pre-order", getAllPreOrder);
router.post("/update-quantity-pre-order-product", authToken, updateQuantityPreOrderProduct);
router.post("/update-pre-order-product", authToken, updatePreOrderProduct);

//aall shipping-method
router.get("/all-shipping-method", authToken, allShippingMethods);

// Route to add a new shipping method
router.post('/add-shipping-method', authToken, addShippingMethod);

// Route to update an existing shipping method
router.post("/update-shipping-method", authToken, updateShippingMethod);

// Route to delete a shipping method
router.post("/delete-shipping-method/:id", authToken, deleteShippingMethod);

//update order status
router.post("/update-order-status",  authToken, updateOrderStatus);

//update stock quantity
router.post("/update-stock-quantity", authToken, updateStockQuantity);


// revenue summary
router.get('/revenue-summary/:period', revenueSummary); // 'weekly' or 'monthly'

//review
router.post('/add', authToken, addReview);

// Lấy đánh giá theo productId
router.get('/reviews/:productId', getReviews);
router.get("/all-review",authToken,getallReviews)

/*** Notigication ***/
//create notification
router.post("/create-notification", async (req, res) => {
    const { userId, message } = req.body;
    try{
        const notification = await notificationService.createNotification(userId, message);
        res.status(201).json(notification);
    }
    catch(err){
        console.error("Error creating notification:", error);
        res.status(500).json({ error: "Error creating notification" });
    }
});
// fetch notifications for a user
router.get("/notifications/:userId", async (req, res) => {
    const { userId } = req.params;
    const { readStatus, page = 1, limit = 20 } = req.query;

    try {
        const { notifications, total } = await notificationController.getNotifications(userId, readStatus, parseInt(page), parseInt(limit));
        res.status(200).json({ notifications, total });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ error: "Error fetching notifications" });
    }
});
// mark notification as read
router.put("/mark-notification-as-read/:notificationId", async (req, res) => {
    const { notificationId } = req.params;
    try{
        const notification = await notificationController.markNotificationAsRead(notificationId);
        res.status(200).json(notification);
    }
    catch(err){
        console.error("Error marking notification as read:", error);
        res.status(500).json({ error: "Error marking notification as read" });
    }
});

module.exports = router