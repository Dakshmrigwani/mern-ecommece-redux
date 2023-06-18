import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Add_Products from "./pages/Add_Products";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Add_Category from "./pages/Add_Category";
import View_Products from "./pages/views/View_Products";
import View_Category from "./pages/views/View_Category";
import View_Users from "./pages/views/View_Users";
import View_Orders from "./pages/views/View_Orders";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/add_product", element: <Add_Products /> },
      { path: "/add_category", element: <Add_Category /> },
      { path: "/view_products", element: <View_Products /> },
      { path: "/view_category", element: <View_Category /> },
      { path: "/view_users", element: <View_Users /> },
      { path: "/view_orders", element: <View_Orders /> },
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
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
