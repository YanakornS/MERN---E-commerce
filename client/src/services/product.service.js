import api from "./api";

const API_URL = "/product";

// ดึงสินค้าทั้งหมด
const getAllProducts = async () => {
  return await api.get(API_URL);
};
const addProduct = async (product) => {
  return await api.post(`${API_URL}`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const updateProduct = async (id, product) => {
  return await api.put(`${API_URL}/${id}`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const deleteProduct = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};
const getCategories = async () => {
  return await api.get("/categories"); // ต้องให้ Backend มี API นี้
};
const ProductService = {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getCategories,
};

export default ProductService;
