import request from "@/utils/request";

export const Login = (data) => {
  return request({ url: "/users/login", method: "post", data });
};

export const register = (data) => {
  return request({ url: "/users/register", method: "post", data });
};
export const getUserInfo = () => {
  return request({ url: "/users/profile", method: "get" });
};
