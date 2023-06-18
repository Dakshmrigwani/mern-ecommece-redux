import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// components
import Layout from "./components/Layout/Layout";
import Shipping from "./components/Shipping/Shipping";
import Payment from "./components/Payment/Payment";
import Success from "./components/Payment/Success";

// pages
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import ConfirmOrder from "./pages/Order/ConfirmOrder";
import UserProfile from "./pages/Profile/UserProfile";
import ForgotPassword from "./pages/Login/ForgotPassword";
import ResetPassword from "./pages/Login/ResetPassword";
import MyOrders from "./pages/Order/MyOrders";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

// extras
import { Toaster } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";

  useEffect(() => {
    async function getStripeApiKey() {
      const { data } = await axios.get(
        "https://api-mern-ecommece.vercel.app/api/stripeapikey",
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("user")
                ? JSON.parse(localStorage.getItem("user")).user_token
                : ""
            }`,
          },
        }
      );
      setStripeApiKey(data.stripeApiKey);
    }
    if (user) {
      getStripeApiKey();
    }
  }, [user]);

  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: "/process/payment",
          element: stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment />
            </Elements>
          ),
        },
        { path: "/", element: <Home /> },
        { path: "/shop", element: <Shop /> },
        { path: "/shop/search", element: <Shop /> },
        { path: "/product/:id", element: <SingleProduct /> },
        { path: "/cart", element: <Cart /> },
        { path: "/wishlist", element: <Wishlist /> },
        { path: "/shipping", element: <Shipping /> },
        { path: "/order/confirm", element: <ConfirmOrder /> },
        { path: "/success", element: <Success /> },
        { path: "/profile", element: <UserProfile /> },
        { path: "/orders", element: <MyOrders /> },
      ],
      element: <Layout />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgotpassword",
      element: <ForgotPassword />,
    },
    {
      path: "/resetpassword/:token",
      element: <ResetPassword />,
    },
  ]);

  return (
    <>
      <Toaster
        position="center-top"
        toastOptions={{
          style: {
            marginTop: "3rem",
            textTransform: "capitalize",
            fontSize: "1.5rem",
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
