import api from "./api";
const API_URL = "/user";

const signJwt = async (email) => {
  return await api.post(`${API_URL}/sign`, { email });
};

const addUser = async (email) => {
  return await api.post(`${API_URL}/`, { email });
};

const getAllUsers = async () => {
  return  await api.get(`${API_URL}/`);
};

const deleteUser = async (email) => {
  return await api.delete(`${API_URL}/${email}`);
};

const updateUserRole = async (email, role) => {
  return await api.put(`${API_URL}/update`, { email, role });

};

const UserService = {
  signJwt,
  addUser,
  deleteUser,
  getAllUsers,
  updateUserRole,
};

export default UserService;
