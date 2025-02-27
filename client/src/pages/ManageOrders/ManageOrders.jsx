import { useEffect, useState } from "react";
// import OrderService from "../../services/order.service";
import Swal from "sweetalert2";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await OrderService.getAllOrders();
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
    setLoading(false);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await OrderService.updateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      Swal.fire("Updated!", "Order status has been updated.", "success");
    } catch (error) {
      console.error("Error updating order status:", error);
      Swal.fire("Error!", "Failed to update order status.", "error");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This order will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await OrderService.deleteOrder(orderId);
        setOrders(orders.filter((order) => order._id !== orderId));

        Swal.fire(
          "Deleted!",
          "Order has been deleted successfully.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      Swal.fire("Error!", "Failed to delete order.", "error");
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order._id.includes(search) ||
      order.customerEmail.includes(search) ||
      (filterStatus ? order.status === filterStatus : true)
  );

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold text-center mb-6">Manage Orders</h2>

      <div className="flex justify-between mb-5">
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search by Order ID or Email..."
          className="input input-bordered w-full max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filter Dropdown */}
        <select
          className="select select-bordered"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Customer Email</th>
              <th className="p-2 border">Total Price (THB)</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order._id} className="border">
                  <td className="p-2 text-center">{order._id}</td>
                  <td className="p-2">{order.customerEmail}</td>
                  <td className="p-2 text-center">{order.totalPrice} THB</td>

                  {/* Order Status Dropdown */}
                  <td className="p-2 text-center">
                    <select
                      className="select select-bordered"
                      value={order.status}
                      onChange={(e) =>
                        handleUpdateStatus(order._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>

                  <td className="p-2 text-center">
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
