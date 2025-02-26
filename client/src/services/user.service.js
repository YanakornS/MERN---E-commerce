import { data } from "react-router";
import api from "./api";
const API_URL = "/user";

const signJwt = async (email) => {
  return await api.post(`${API_URL}/sign`, { email });
};

const addUser = async (email) => {
  return await api.post(`${API_URL}/`, { email });
};

const getAllUsers = async () => {
  return await api.get(`${API_URL}/`);
};

const deleteUser = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};

const updateUser = async (id, data) => {
  return await api.put(`${API_URL}/${id}`, data);
};
const makeAdmin = async (email) => {
  return await api.patch(`${API_URL}/admin/${email}`);
};
const makeUser = async (email) => {
  return await api.patch(`${API_URL}/user/${email}`);
};

const UserService = {
  signJwt,
  addUser,
  deleteUser,
  getAllUsers,
  updateUser,
  makeAdmin,
  makeUser,
};

export default UserService;
