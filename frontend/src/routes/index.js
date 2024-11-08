import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassowrd'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import Payment from '../pages/Payment'
import AllOrders from '../pages/AllOrders'
import AllNews from '../pages/AllNew'
import News from '../pages/News'
import NewsDetails from '../components/NewsDetails'
import LoginSuccess from '../pages/LoginSuccess'
import ResetPassword from '../pages/ResetPassword'
import AllDiscount from '../pages/All-Discount'
import SupportCustomer from '../components/Support'
import AllReview from '../pages/AllReview'
import AllOnSale  from '../pages/AllOnSale'
import PostUser from  '../pages/PostUser'
import UserStore from '../components/UserStore'
import AllPreOrderProduct from '../pages/AllPreOrderProduct'
import CancelPayment from '../pages/CancelPayment'
import SuccessPayment from '../pages/SuccessPayment'
// import AllPreOrderProduct from '../pages/AllPreOrderProduct'
import AllPreOrders from '../pages/AllPreOrders' 
import NotificationPage from '../pages/NotificationPage'
import UserPanel from '../pages/UserPanel'
import ChangePassword from '../components/ChangePassword'
import PaymentSuccess from  '../pages/PaymentSuccess'
import AllShippingMethods from '../pages/AllShippingMethods'
import Inventory from '../pages/Inventory'
import RevenueSummary from '../pages/RevenueSummary'

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassowrd/>
            },
            {
                path : "sign-up",
                element : <SignUp/>
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    },
                    {
                        path: "all-orders",
                        element : <AllOrders/>
                    },
                    {   path: "all-shipping-methods",
                        element: <AllShippingMethods/>
                    },
                    {
                        path : "inventory-management",
                        element : <Inventory/>
                    },
                    {
                        path : "revenue-summary",
                        element: <RevenueSummary/>
                    },
                    {
                        path: "AllNews",
                        element : <AllNews/>
                    },
                    {
                        path : "discount",
                        element : <AllDiscount/>
                    },
                    {
                        path: 'all-review',
                        element: <AllReview />
                    },
                    {
                        path: 'all-onSale',
                        element: <AllOnSale />
                    },
                    {
                        path: 'post-user',
                        element: <PostUser/>
                    },
                    {
                        path: 'all-pre-order-product',
                        element: <AllPreOrderProduct />
                    }, {
                        path: 'all-pre-order',
                        element: <AllPreOrders />
                    }
                
                ]
            },
            {
                path: "user-panel",
                element : <UserPanel/>,
            },
            {
                path : "payment",
                element : <Payment/>
            },
            {
                path : "user-panel",
                element : <UserPanel/>,
            },
            {
                path : "change-password",
                element: <ChangePassword/>,
            },
            {
                path: "payment-success",
                element: <PaymentSuccess/>,
            },
            {
                path : "news",
                element : <News/>
            },
            {
                path : "news/:id",
                element : <NewsDetails/>
            },
            {
                path: 'SupportCustomer',
                element: <SupportCustomer />
            },
            {
                path: 'UserStore',
                element: <UserStore/>
            },
            {
                path: 'payment/cancel/:preOrderId',
                element: <CancelPayment />
            },
            {
                path: 'payment/success/:preOrderId',
                element: < SuccessPayment />
            },
            {
                path : "notifications",
                element : <NotificationPage/>
            }
        ]
    }
])


export default router