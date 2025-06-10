import request from "@/utils/request";

export const login = (data) => {
  return request({ url: "/users/login", method: "post", data });
};

export const register = (data) => {
  return request({ url: "/users/register", method: "post", data });
};
