import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main";
import Home from "../pages/Home/index";
import Shop from "../pages/Shop/index";
import Cart from "../pages/Cart/index";
import Testimonials_v_Oxe from "../pages/Home/Testimonials_v_Oxe";

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
    ],
  },
]);

export default router;
