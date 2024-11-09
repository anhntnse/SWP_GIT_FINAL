const backendDomin = "https://swp-final-backend.onrender.com"

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
    forgot_password: {
        url: `${backendDomin}/api/forgot-password`,
        method: "post"
    },
    reset_password: {
        url: `${backendDomin}/api/reset-password`,
        method: "post"
    },
    google_signIn: {
        url: `${backendDomin}/api/auth/google`,
        method: "get",
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
    sendIntroductNewProductMail: {
        url: `${backendDomin}/api/introduct-new-product-mail`,
        method: 'post',
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
    },
    updateOrderStatus: {
        url : `${backendDomin}/api/update-order-status`,
        method : 'post'
    },
    updateStockQuantity: {
        url : `${backendDomin}/api/update-stock-quantity`,
        method : 'post'
    },
    deleteProduct: {
        url : `${backendDomin}/api/delete-product`,
        method: 'post'
    },
    revenueSummary: {
        url : `${backendDomin}/api/revenue-summary`,
        method : 'get'
    },
    uploadNews : {
        url : `${backendDomin}/api/upload-news`,
        method : 'post'
    },
    allNews : {
        url : `${backendDomin}/api/get-news`,
        method : 'get'
    },
    newsDetails : {
        url : `${backendDomin}/api/news-details`,
        method : 'post'
    },
    allDiscount : {
        url : `${backendDomin}/api/get-discount`,
        method : 'get'
    },
    uploadDiscount : {
        url : `${backendDomin}/api/upload-discount`,
        method : 'post'
    },
    AddReview : {
        url: `${backendDomin}/api/add`, 
        method: 'post',
    },
    getReviews : {
        url: `${backendDomin}/api/:productId`,
        method: 'get',
    },
    allreview : {
        url: `${backendDomin}/api/all-review`,
        method: 'get',
    },
    newestProducts : {
        url: `${backendDomin}/api/get-newestProduct`,
        method: 'get',
    },
    updateStatusOrder: {
        url: (orderId) => `${backendDomin}/api/updatestatus-order/${orderId}`, 
        method: 'put',
    },
    getBestSellerProducts: {
        url: (category) => {
            return category 
                ? `${backendDomin}/api/best-seller-products?category=${category}` 
                : `${backendDomin}/api/best-seller-products`;
        },
        method: 'get',
    },
     createPost: {
        url: `${backendDomin}/api/createPost`,
        method: 'post',
    },
    updateStatus: {
        url: (postId) => `${backendDomin}/api//postUser/${postId}/status`,
        method: 'put',
    },
    deletePost: {
        url: (Id) => `${backendDomin}/api/deletePost/${Id}`,
        method: 'delete',
    },
    getAllPost: {
        url: `${backendDomin}/api/getAllPost`,
        method: 'get',
    },
    userInfo : {
        url: `${backendDomin}/api/user-info`,
        method: 'get',
    },
    checkOutOfStock: {
        url: `${backendDomin}/api/check-out-of-stock`,
        method: 'post',
    },
    applyDiscount: {
        url: `${backendDomin}/api/apply-discount`,
        method: 'post',
    },
    sendIntroductNewDiscountMail: {
        url: `${backendDomin}/api/send-introduct-new-discount-mail`,
        method: 'post',
    },
    allPreOrderProduct: {
        url: `${backendDomin}/api/get-all-pre-order-product`,
        method: 'get',
    },
    createPreOrderProduct: {
        url: `${backendDomin}/api/create-pre-order-product`,
        method: 'post',
    },
    getLimitPreOrderProducts: {
        url: `${backendDomin}/api/get-limit-pre-order-product`,
        method: 'get'
    },
    preOrderProduct: {
        url: `${backendDomin}/api/pre-order-product`,
        method: 'post',
    },
    payDepositPreOrderProduct: {
        url: `${backendDomin}/api/pay-deposit-pre-order-product`,
        method: 'post',
    },
    updatePreOrder: {
        url: `${backendDomin}/api/update-pre-order`,
        method: 'put',
    },
    updateQuantityPreOrderProduct: {
        url: `${backendDomin}/api/update-quantity-pre-order-product`,
        method: 'post',
    },
    allPreOrder: {
        url: `${backendDomin}/api/get-all-pre-order`,
        method: 'get',
    },
    updatePreOrderProduct: {
        url: `${backendDomin}/api/update-pre-order-product`,
        method: 'post',
    },
        // create notification
        createNotification: {
            url: `${backendDomin}/api/create-notification`,
            method: 'post',
        },
        // get notifications
        getNotifications: {
            url: (userId) => `${backendDomin}/api/notifications/${userId}`,
            method: 'get',
        },
         // Mark notification as read
         markNotificationAsRead: {
            url: (notificationId) => `${backendDomin}/api/mark-notification-as-read/${notificationId}`,
            method: 'put',
        },
        getProductReviews: {
            url: `${backendDomin}/api/reviews`,
            method: 'get'
        },
        deleteUser: {
            url: `${backendDomin}/api/delete-user`,
            method: 'delete'
        },
      
}


export default SummaryApi