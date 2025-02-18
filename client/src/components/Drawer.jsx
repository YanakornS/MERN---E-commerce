import React from "react";
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

const Drawer = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden mt-4"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* User Profile */}
          <div className="flex flex-col items-center mb-4">
            <img
              src="https://via.placeholder.com/50"
              alt="User Avatar"
              className="w-16 h-16 rounded-full border-2 border-gray-300"
            />
            <span className="mt-2 badge badge-primary px-4 py-1">Admin</span>
          </div>
          {/* Admin Links */}
          <ul className="space-y-2">
            <li>
              <a className="flex items-center gap-2">
                <FaTachometerAlt />
                Dashboard
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2">
                <FaShoppingCart />
                Manage Orders
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2">
                <FaPlus />
                Add Product
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2">
                <FaList />
                Manage Item
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2">
                <FaUsers />
                All Users
              </a>
            </li>
          </ul>
          <div className="divider"></div> {/* Divider */}
          {/* User Links */}
          <ul className="space-y-2">
            <li>
              <a className="flex items-center gap-2">
                <FaHome />
                Home
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2">
                <FaBox />
                Product
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2">
                <FaMapMarkedAlt />
                Order Tracking
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2">
                <FaHeadset />
                Customer Support
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
