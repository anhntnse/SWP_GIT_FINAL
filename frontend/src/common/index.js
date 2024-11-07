
const backendDomin = "https://swp-final-backend.onrender.com";

const SummaryApi = {
    signUP : {
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    editProfile: {
        url : `${backendDomin}/api/edit-profile`,
        method : "post"
    },
    changePassword: {
        url : `${backendDomin}/api/change-password`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomin}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomin}/api/update-product`,
        method  : 'post'
    },
    categoryProduct : {
        url : `${backendDomin}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomin}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomin}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomin}/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomin}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomin}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomin}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomin}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomin}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomin}/api/filter-product`,
        method : 'post'
    }
    ,
    updateOrder: {
        url: `${backendDomin}/api/update-order`,
        method: 'post'
    },
    createOrder: {
        url: `${backendDomin}/api/create-order`,
        method: 'post'
    },
    payment: {
        url: `${backendDomin}/api/create-payment-link`,
        method: 'post'
    },
    allOrder : {
        url : `${backendDomin}/api/all-order`,
        method : 'get'
    },
    userOrder : {
        url : `${backendDomin}/api/user-order`,
        method : 'get'
    },
    orderDetail: {
        url : `${backendDomin}/api/order-detail`,  // Add this line for order details
        method: 'get'
    },
    allShippingMethods: {
        url : `${backendDomin}/api/all-shipping-method`,
        method : 'get'
    },
    addShippingMethod: {
        url : `${backendDomin}/api/add-shipping-method`,
        method : 'post'
    },
    updateShippingMethod: {
        url : `${backendDomin}/api/update-shipping-method`,
        method : 'post'
    },
    deleteShippingMethod: {
        url : `${backendDomin}/api/delete-shipping-method`,
        method : 'post'
    }
}


export default SummaryApi