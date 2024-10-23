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
import UserPanel from '../pages/UserPanel'
import ChangePassword from '../components/ChangePassword'
import PaymentSuccess from  '../pages/PaymentSuccess'

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
            }
        ]
    }
])


export default router