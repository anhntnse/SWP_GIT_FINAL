const express = require('express')

const router = express.Router()

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
const userOrders =  require('../controller/order/userOrders')
const editProfileController = require('../controller/user/editProfile')
const changePasswordController = require('../controller/user/changePasswordController')
const orderDetail = require('../controller/order/orderDetail')
const addShippingMethod = require('../controller/shipping/addShippingMethod');
const allShippingMethods = require('../controller/shipping/allShippingMethods');
const updateShippingMethod = require('../controller/shipping/updateShippingMethod');
const deleteShippingMethod = require('../controller/shipping/deleteShippingMethod');
const updateOrderStatus  = require('../controller/order/updateOrderStatus');
const updateStockQuantity = require('../controller/product/updateStockQuantity');
const deleteProduct = require('../controller/product/deleteProduct')
const revenueSummary = require('../controller/order/revenueSummary')

router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)

//admin panel 
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)


//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

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

router.get("/all-shipping-method", authToken, allShippingMethods);
// Route to get all shipping methods

// Route to add a new shipping method
router.post('/add-shipping-method', authToken, addShippingMethod);

// Route to update an existing shipping method
router.post("/update-shipping-method", authToken, updateShippingMethod);

// Route to delete a shipping method
router.post("/delete-shipping-method/:id", authToken, deleteShippingMethod);

router.post("/update-order-status",  authToken, updateOrderStatus);

router.post("/update-stock-quantity", authToken, updateStockQuantity);
router.post("/delete-product/:productId", authToken, deleteProduct);

router.get('/revenue-summary/:period', revenueSummary); // 'weekly' or 'monthly'

module.exports = router