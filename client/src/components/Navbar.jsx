import React, { useContext } from "react";
import Profile from "./Profile";
import { AuthContext } from "../context/Authcontext";
import UserIcon from "./icons/UserIcon";
import Modal from "./Modal";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const navItem = (
    <>
      <li>
        <a href="Home">Home</a>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Category</summary>
          <ul>
            <li>
              <a href="/shop">All</a>
            </li>
            <li>
              <a href="/shop?category=clothing">Clothing</a>
            </li>
            <li>
              <a href="/shop?category=accessories">Accessories</a>
            </li>
            <li>
              <a href="/shop?category=gadgets">Gadgets</a>
            </li>
            <li>
              <a href="/shop?category=swag">Swag</a>
            </li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Service</summary>
          <ul>
            <li>
              <a href="Order">Order</a>
            </li>
            <li>
              <a href="Order Tracking">Order Tracking</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a href="/">Promotions</a>
      </li>
      <li>
        <a href="/">About Us</a>
      </li>
    </>
  );

  return (
    <div className="navbar fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b border-gray-300 backdrop-blur-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItem}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl" href="/">
          <img
            src="/LogoShop.png"
            alt="Logo"
            className="h-6 lg:h-12 pr-1 mx-auto"
          />
          SE Souvenir Shop
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItem}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <span className="font-semibold pr-4">{user?.displayName || "ไม่ระบุชื่อ"}</span>
            <Profile />
          </>
        ) : (
          <button
            className="btn bg-red text-white rounded-full px-5 flex items-center gap-2"
            onClick={() => document.getElementById("login").showModal()}
          >
            <UserIcon className="w-6 h-6" />
            Login
          </button>
        )}
      </div>
      <Modal name="login" />
    </div>
  );
};

export default Navbar;
