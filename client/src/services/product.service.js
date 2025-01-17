import api from "./api";
const API_URL = "/product";
import axios from "axios";

const getAllProducts = async () => {
  //http://localhost:5173/product.json
  //const response = await axios.get(`http://localhost:5000/api/v1/product`);
  return await api.get(`${API_URL}`);
};
const ProductService = {
  getAllProducts,
};
export default ProductService;
