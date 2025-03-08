import React, { useContext } from "react";
import { Outlet, useLocation, Link } from "react-router";
import { AuthContext } from "../context/Authcontext";

import {
  FaBars,
  FaTachometerAlt,
  FaShoppingCart,
  FaPlus,
  FaList,
  FaUsers,
  FaHome,
  FaBox,
  FaMapMarkedAlt,
  FaHeadset,
} from "react-icons/fa";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = true;
  const location = useLocation();

  if (!isAdmin) {
    return (
      <div className="text-red-500 text-center mt-10">
        You are not an Admin!
      </div>
    );
  }

  const pathnames = location.pathname.split("/").filter((x) => x);
  const breadcrumbs = (
    <div className="breadcrumbs text-sm mb-4">
      <ul className="flex items-center space-x-2">
        <li className="flex items-center">
          <Link
            to="/DashboardLayout"
            className="text-blue-500 hover:underline flex items-center gap-1"
          >
            <FaHome className="h-4 w-4" />
            Dashboard
          </Link>
        </li>

        {pathnames.slice(1).map((segment, index) => {
          const path = `/DashboardLayout/${pathnames
            .slice(1, index + 2)
            .join("/")}`;
          const isLast = index === pathnames.length - 2;

          return (
            <li key={index} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-gray-500 capitalize">{segment}</span>
              ) : (
                <Link
                  to={path}
                  className="text-blue-500 capitalize hover:underline"
                >
                  {segment}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col p-6">
        {/* ปุ่ม Toggle Menu บนมือถือ (ซ้ายบน)  */}
        <label
          htmlFor="dashboard-drawer"
          className=" mt-12 lg:hidden bg-blue-600 hover:bg-blue-600 border-blue-300 btn btn-sm btn-outline absolute top-4 left-4"
        >
          <FaBars className="text-lg text-white" />
        </label>

        {/*  Breadcrumbs แสดงตำแหน่งปัจจุบัน */}
        {breadcrumbs}

        {/*  เนื้อหาของแต่ละหน้า */}
        <Outlet />
      </div>

      {/*  Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <div className="menu w-64 bg-base-200 min-h-screen p-4 shadow-lg">
          <div className="flex flex-col items-center mb-6">
            <img
              src="/LogoShop.png"
              alt="User Avatar"
              className="w-16 h-16 rounded-full border-2 border-gray-300"
            />
            <span className="text-black text-xl textarea-md "> ADMIN  </span>
            <a
              href="/profile"
              className="mt-2 px-4 py-1 text-sm  text-black  bg-blue-400 rounded-full shadow-md"
            >
              @{user.displayName}
            </a>
          </div>

          <ul className="space-y-3 text-gray-700">
            <li>
              <Link
                to="/DashboardLayout"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-300 transition"
              >
                <FaHome className="text-lg" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/DashboardLayout/manageorders"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-300 transition"
              >
                <FaShoppingCart className="text-lg" />
                Manage Orders
              </Link>
            </li>
            <li>
              <Link
                to="/DashboardLayout/addproduct"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-300 transition"
              >
                <FaPlus className="text-lg" />
                Add Product
              </Link>
            </li>
            <li>
              <Link
                to="/DashboardLayout/manageitem"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-300 transition"
              >
                <FaList className="text-lg" />
                Manage Item
              </Link>
            </li>
            <li>
              <Link
                to="/DashboardLayout/allusers"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-300 transition"
              >
                <FaUsers className="text-lg" />
                All Users
              </Link>
            </li>
          </ul>

          <div className="divider my-4"></div>

          <ul className="space-y-3 text-gray-700">
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-300 transition"
              >
                <FaHome className="text-lg" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-300 transition"
              >
                <FaBox className="text-lg" />
                Product
              </Link>
            </li>
            <li>
              <Link
                to="/order-tracking"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-300 transition"
              >
                <FaMapMarkedAlt className="text-lg" />
                Order Tracking
              </Link>
            </li>
            <li>
              <Link
                to="/customer-support"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-300 transition"
              >
                <FaHeadset className="text-lg" />
                Customer Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
