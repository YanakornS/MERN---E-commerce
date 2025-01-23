import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main";
import Home from "../pages/Home/index";
import Shop from "../pages/Shop/index";
import Cart from "../pages/Cart/index";
import Testimonials_v_Oxe from "../pages/Home/Testimonials_v_Oxe";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import UpdateProfile from "../components/UpdateProfile";
import Profile from "../pages/Profile/Index";

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
        element: <Cart />,
      },
      {
        path: "/Testimonials",
        element: <Testimonials_v_Oxe />,
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
        element: <UpdateProfile />,
      },
      {
        path: "/Profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
