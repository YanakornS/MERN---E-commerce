import React from "react";
import { Outlet } from "react-router";
import {
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
  const isAdmin = true;

  if (!isAdmin) {
    return (
      <div className="text-red-500 text-center mt-10">
        You are not an Admin!
      </div>
    );
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col p-6">
        {/* Page content here */}
        <Outlet />
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <div className="menu w-64 bg-base-200 min-h-screen p-4 shadow-lg">
          {/* User Profile */}
          <div className="flex flex-col items-center mb-6">
            <img
              src="/LogoShop.png"
              alt="User Avatar"
              className="w-16 h-16 rounded-full border-2 border-gray-300"
            />
            <span className="mt-2 badge badge-primary px-4 py-1">Admin</span>
          </div>

          {/* Admin Links */}
          <ul className="space-y-3 text-gray-700">
            <li>
              <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-300 transition">
                <FaTachometerAlt className="text-lg" />
                Dashboard
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-300 transition">
                <FaShoppingCart className="text-lg" />
                Manage Orders
              </a>
            </li>
            <li>
              <a
                href="/DashboardLayout/addproduct"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-300 transition"
              >
                <FaPlus className="text-lg" />
                Add Product
              </a>
            </li>
            <li>
              <a
                href="/DashboardLayout/manageitem"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-300 transition"
              >
                <FaList className="text-lg" />
                Manage Item
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-300 transition">
                <FaUsers className="text-lg" />
                All Users
              </a>
            </li>
          </ul>
          <div className="divider my-4"></div>

          {/* User Links */}
          <ul className="space-y-3 text-gray-700">
            <li>
              <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-300 transition">
                <FaHome className="text-lg" />
                Home
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-300 transition">
                <FaBox className="text-lg" />
                Product
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-300 transition">
                <FaMapMarkedAlt className="text-lg" />
                Order Tracking
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-300 transition">
                <FaHeadset className="text-lg" />
                Customer Support
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
