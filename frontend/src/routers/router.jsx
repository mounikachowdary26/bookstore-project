import {
    createBrowserRouter,
   
  } from "react-router-dom";

  import App from "../App";  // Adjust the path if needed
import Home from "../pages/home/Home";
import Register from "../components/Register";
import Login from "../components/Login";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
        path:"/",
        element:< Home/>,
        },
        {
         path: "/orders",
         element:<div>Orders</div>
        },
        {
            path:"/about",
            element:<div>About</div>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
          path:"/cart",
          element:<CartPage/>
        },
        {
          path:"/checkout",
          element:<CheckoutPage/>
        },
        
      ]
    },
  ]);
  export default router;
  