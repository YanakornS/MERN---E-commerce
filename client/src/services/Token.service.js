import { Cookies } from "react-cookie";
const cookies = new Cookies();

const getLocalAccessToken = () => {
  const user = getUser();
  return user?.token;
};
const getToken = () => {
  const token = cookies.get("Token");
  console.log("Token:", token);
  return token;
};

const getUser = () => {
  const user = cookies.get("user");
  return user;
};

const removeUser = () => {
  cookies.remove("user", { path: "/" });
};

const setUser = (user) => {
  cookies.set("user", JSON.stringify(user), {
    path: "/",
    expires: new Date(Date.now() + 86400 * 1000),
  });
};
const TokenService = {
  getLocalAccessToken,
  setUser,
  getUser,
  removeUser,
  getToken,
};

export default TokenService;
