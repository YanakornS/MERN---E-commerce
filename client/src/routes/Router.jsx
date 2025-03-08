import { createBrowserRouter } from "react-router";
// import MainLayout from "../layouts/Main";
// import Home from "../pages/Home/index";
// import Shop from "../pages/Shop/index";
// import Cart from "../pages/Cart/index";
// import SignIn from "../components/SignIn";
// import SignUp from "../components/SignUp";
// import UpdateProfile from "../components/UpdateProfile";
// import Profile from "../pages/Profile/Index";
// import ProtectPage from "../pages/ProtectPage/index";

//imporn Lazy Loding
import { lazy } from "react";

const Home = lazy(() => import("../pages/Home/index"));
const Shop = lazy(() => import("../pages/Shop/index"));
const Cart = lazy(() => import("../pages/Cart/index"));
const SignIn = lazy(() => import("../components/SignIn"));
const SignUp = lazy(() => import("../components/SignUp"));
const UpdateProfile = lazy(() => import("../components/UpdateProfile"));
const Profile = lazy(() => import("../pages/Profile/Index"));
const ProtectPage = lazy(() => import("../pages/ProtectPage/index"));
const MainLayout = lazy(() => import("../layouts/Main"));
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));
const AddProduct = lazy(() => import("../pages/Product/AddProduct"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const ManageItems = lazy(() => import("../pages/ManageItems/index"));
const AdminRoute = lazy(() => import("../pages/ProtectPage/AdminRouter"));
const AllUser = lazy(() => import("../pages/Dashboard/AllUser"));
const CheckOutSuccess = lazy(() => import("../pages/CheckOutSuccess/index"));
const ManageOrders = lazy(() => import("../pages/ManageOrders/ManageOrders"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/cart",
        element: (
          <ProtectPage>
            <Cart />
          </ProtectPage>
        ),
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/UpdateProfile",
        element: (
          <ProtectPage>
            <UpdateProfile />
          </ProtectPage>
        ),
      },
      {
        path: "/Profile",
        element: (
          <ProtectPage>
            <Profile />
          </ProtectPage>
        ),
      },
      {
        path: "checkout-success",
        element: <CheckOutSuccess />,
      },
    ],
  },
  {
    path: "/DashboardLayout",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "addproduct",
        element: <AddProduct />,
      },
      {
        path: "manageitem",
        element: <ManageItems />,
      },
      {
        path: "AllUsers",
        element: <AllUser />,
      },
      {
        path: "ManageOrders",
        element: <ManageOrders />,
      },
    ],
  },
]);

export default router;
