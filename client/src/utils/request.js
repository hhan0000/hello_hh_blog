import axios from "axios";
import { getToken, removeToken } from "./auth";
import errorCode from "@/utils/errorCode";
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = getToken(); // 获取 token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // 假设后端需要 Bearer 前缀
    }
    config.headers["Cache-Control"] = "no-cache";
    config.headers["Pragma"] = "no-cache";
    config.headers["Expires"] = "0";
    return config;
  },
  (error) => {
    console.error("请求错误：", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    const code = res.data.code || 200;
    const msg = errorCode[code] || res.data.msg || errorCode["default"];

    if (code === 401) {
      removeToken();
      navigator.replace("/login");
      return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
    } else if (code === 500) {
      return Promise.reject(msg);
    } else if (code !== 200) {
      return Promise.reject(msg);
    } else {
      return Promise.resolve(res.data);
    }
  },
  (error) => {
    console.error("响应错误：", error);
    return Promise.reject(error);
  }
);
export default service;
