import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main";
import Home from "../pages/Home/index";
import Shop from "../pages/Shop/index";
import Cart from "../pages/Cart/index";

import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import UpdateProfile from "../components/UpdateProfile";
import Profile from "../pages/Profile/Index";
import ProtectPage from "../pages/ProtectPage/index";

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
    ],
  },
]);

export default router;
