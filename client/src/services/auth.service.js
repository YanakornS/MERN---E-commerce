import api from "./api";
import Tokenservice from "./token.service"; // นำเข้า Tokenservice
import { Cookies } from "react-cookie";

const API_URL = import.meta.env.VITE_BASE;

const register = async (username, password) => {
  return await api.post(API_URL + "/register", { username, password });
};

const cookies = new Cookies();

///Login เก็บข้อมูลไว้ใน Cookies
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // หากต้องการสร้าง JWT token หรือได้รับจาก Firebase หรือ API
    const token = await user.getIdToken();

    // เก็บ token ลงใน Cookies
    Cookies.set("token", token, { expires: 1 }); // ตั้งเวลา expiration ให้เป็น 1 วัน (1 วัน = 1)
    console.log("User logged in and token saved in cookies:", token);

    setUser(user); // Set user state
  } catch (error) {
    console.error("Login failed:", error);
  }
};
const logoutCookies = () => {
  cookies.remove("accesstoken", { path: "/" });
  cookies.remove("user", { path: "/" });
};

const getCurrentUser = () => {
  return Tokenservice.getUser();
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  logoutCookies,
  loginCookies,
};

export default AuthService;
