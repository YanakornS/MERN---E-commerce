import axios from "axios";
import TokenService from "./Token.service";

const baseURL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken();
    console.log("Token:", token);
    if (token) {
      config.headers["x-access-token"] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;
