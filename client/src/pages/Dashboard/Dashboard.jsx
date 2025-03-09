import React from "react";
import { Link } from "react-router";
import { FaShoppingCart,  FaUsers } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold  mb-6 text-gray-800">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border border-gray-200">
          <FaShoppingCart className="text-4xl text-blue-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-2">Manage Orders</h3>
          <p className="text-gray-600 text-sm mb-4">ตรวจสอบและจัดการคำสั่งซื้อทั้งหมด</p>
          <Link to="/DashboardLayout/manageorders">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">
              Go to Orders
            </button>
          </Link>
        </div>

    
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border border-gray-200">
          <AiOutlineProduct className="text-4xl text-green-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-2">Manage Items</h3>
          <p className="text-gray-600 text-sm mb-4">เพิ่ม, ลบ และแก้ไขรายการสินค้า</p>
          <Link to="/DashboardLayout/manageitem">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition">
              Go to Items
            </button>
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center border border-gray-200">
          <FaUsers className="text-4xl text-purple-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
          <p className="text-gray-600 text-sm mb-4">ดูและจัดการบัญชีผู้ใช้,สามารถเเก้ไขได้</p>
          <Link to="/DashboardLayout/allusers">
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-600 transition">
              Go to Users
            </button>
          </Link>
        </div>

 
      </div>
    </div>
  );
};

export default Dashboard;
