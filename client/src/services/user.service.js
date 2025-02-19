import api from "./api";
const API_URL = "/user";

const signJwt = async (email) => {
  return await api.post(`${API_URL}/sign`, { email });
};

const addUser = async (email) => {
  return await api.post(`${API_URL}/`, { email });
};

const UserService = {
  signJwt,
  addUser,
};

export default UserService;
