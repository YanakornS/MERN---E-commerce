import api from "./api";
const API_URL = "/cart";

const getAllCartItems = async () => {
  //http://localhost:5173/api/v1/cart
  //const response = await axios.get(`http://localhost:5000/api/v1/cart`);
  return await api.get(`${API_URL}`);
};

const getCartItemsByEmail = async (email) => {
  //http://localhost:5173/api/v1/cart/email
  //const response = await axios.get(`http://localhost:5000/api/v1/cart/${email}`);
  return await api.get(`${API_URL}/${email}`);
  console.log(email);
};

const updateCartItem = async (id, data) => {
  //http://localhost:5173/api/v1/cart/id

  return await api.put(`${API_URL}/${id}`, data);
};

const deleteCartItem = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};

const createCartItem = async (data) => {
  //http://localhost:5173/api/v1/cart

  return await api.post(`${API_URL}`, data);
};

const clearCart = async (email) => {
  return await api.delete(`${API_URL}/clear/${email}`);
};

const CartService = {
  getAllCartItems,
  getCartItemsByEmail,
  createCartItem,
  deleteCartItem,
  updateCartItem,
  clearCart,
};

export default CartService;
