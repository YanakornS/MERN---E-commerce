import api from "./api";

const API_URL = "/order";

const getAllOrders = async () => {
  return await api.get(`${API_URL}`);
};

const getOrderById = async (orderId) => {
  return await api.get(`${API_URL}/${orderId}`);
};

const getOrdersByEmail = async (email) => {
  return await api.get(`${API_URL}/email/${email}`);
};

const updateOrderDetail = async (orderId, deliveryStatus) => {
  return await api.put(`${API_URL}/${orderId}`, {
    delivery_status: deliveryStatus,
  });
};

const deleteOrder = async (orderId) => {
  return await api.delete(`${API_URL}/${orderId}`);
};

const OrderService = {
  getAllOrders,
  getOrderById,
  getOrdersByEmail,
  updateOrderDetail,
  deleteOrder,
};

export default OrderService;
