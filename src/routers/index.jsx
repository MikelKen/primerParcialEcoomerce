import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPane from "../pages/AdminPane";
import AllUsers from "../pages/AllUsers"
import AllProducts from "../pages/AllProducts"
import CategoryProduct from "../pages/CategoryProduct"
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import TypePayment from "../components/TypePayment";
import AllOrders from "../pages/AllOrders";
import DetailOrder from "../components/DetailOrder";


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
                path :  "Login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassword/>
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
                path : "cart",
                element : <Cart/>
            },
            {
                path : "type-payment",
                element : <TypePayment/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
            {
                path : "order-detail/:id",
                element : <DetailOrder/>
            },
            {
                path : "admin-panel",
                element : <AdminPane/>,
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
                        path : "all-orders",
                        element : <AllOrders/>
                    },
                ]
            }
        ]
    }
])

export default router;