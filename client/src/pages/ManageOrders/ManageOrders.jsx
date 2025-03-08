import { useEffect, useState, useRef } from "react";
import OrderService from "../../services/order.service";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import OrderDetailsModal from "./OrderDetailsModal";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (selectedOrder && modalRef.current) {
      modalRef.current.showModal(); 
    }
  }, [selectedOrder]);

  const fetchOrders = async () => {
    try {
      const response = await OrderService.getAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await OrderService.deleteOrder(orderId);
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order._id !== orderId)
          );
          Swal.fire("Deleted!", "The order has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting order:", error);
          Swal.fire("Error!", "Failed to delete the order.", "error");
        }
      }
    });
  };

  const handleStatusChange = async (orderId, newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change the order status to "${newStatus}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await OrderService.updateOrderDetail(orderId, newStatus);
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === orderId
                ? { ...order, delivery_status: newStatus }
                : order
            )
          );
          Swal.fire("Updated!", "Order status has been updated.", "success");
        } catch (error) {
          console.error("Error updating status:", error);
          Swal.fire("Error!", "Failed to update status.", "error");
        }
      }
    });
  };

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-800">
        Manage Orders
      </h2>
      <span className="text-lg  font-semibold " > Total Oders: {orders.length} </span> 
      <div className="overflow-x-auto mt-2 bg-white shadow-md rounded-lg">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-red-800 to-red-600 text-black text-xs sm:text-sm md:text-base">
              <th className="p-3 border">OrderId</th>
              <th className="p-3 border  sm:table-cell">Email</th>
              <th className="p-3 border">Total</th>
              <th className="p-3 border">Payment</th>
              <th className="p-3 border hidden md:table-cell">Delivery</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="text-center border-b text-xs sm:text-sm md:text-base hover:bg-gray-100"
                >
                  <td className="p-2 font-medium text-black">
                    {order._id.slice(0, 4)}...{order._id.slice(-4)}
                  </td>
                  <td className="p-2 text-black hidden sm:table-cell">
                    {order.email}
                  </td>
                  <td className="p-2 font-semibold text-gray-800">
                    ฿{order.total.toLocaleString()}
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 font-semibold rounded-full ${
                        order.payment_status === "paid"
                          ? "bg-green-500 text-white"
                          : "bg-rose-600 text-white"
                      }`}
                    >
                      {order.payment_status === "paid" ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="p-2 hidden md:table-cell">
                    <select
                      className="border p-1 rounded-lg border-blue-300 focus:ring-2 focus:ring-red-400"
                      value={order.delivery_status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="p-2 flex justify-center space-x-2 flex-wrap">
                    <button
                      className="bg-blue-500 text-white p-2 rounded-full shadow-md transition transform hover:scale-105"
                      onClick={() => openOrderDetails(order)}
                    >
                      <FaEye size={16} />
                    </button>
                    <button
                      className="bg-rose-600 text-white p-2 rounded-full shadow-md transition transform hover:scale-105"
                      title="Delete Order"
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      <MdDelete size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <OrderDetailsModal ref={modalRef} order={selectedOrder} />
    </div>
  );
};

export default ManageOrders;
