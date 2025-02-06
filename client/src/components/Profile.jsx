import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useCart from "../hooks/useCart";

const Profile = () => {
  const { logout } = useContext(AuthContext);
  const user = useContext(AuthContext).user;
  const [cart, refetch] = useCart();
  return (
    <div>
      <button className="btn btn-ghost btn-circle">
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
      <div className="dropdown dropdown-end">
        <a href="/cart" role="button" className="btn btn-ghost btn-circle">
          <div className="indicator">
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm indicator-item">
              {(cart && cart.length) || 0}
            </span>
          </div>
        </a>
        <div
          tabIndex={0}
          className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
        ></div>
      </div>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          {user?.photoURL ? (
            <img
              src={user.photoURL} // Correctly set the user's photoURL if available
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <img
              alt="Default Avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              className="w-10 h-10 rounded-full"
            />
          )}
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <a href="/profile" className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li>
            <a href="/updateprofile">Settings</a>
          </li>
          <li>
            <a onClick={() => logout()}>Logout</a>{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
