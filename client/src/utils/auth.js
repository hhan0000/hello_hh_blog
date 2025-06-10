// 定义存储键常量，使用对象统一管理存储键，方便后续维护和扩展
const STORAGE_KEYS = {
  TOKEN: "token",
};

// 获取存储在 localStorage 中的 token
export const getToken = () => {
  // 使用常量 STORAGE_KEYS.TOKEN 替代硬编码的 "token"
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

// 将 token 存储到 localStorage 中
export const setToken = (token) => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

// 新增移除 token 的函数，完善 token 管理功能
export const removeToken = () => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

// 新增检查 token 是否存在的函数
export const hasToken = () => {
  return !!localStorage.getItem(STORAGE_KEYS.TOKEN);
};
// utils/auth.js
export function isLoggedIn() {
  return !!localStorage.getItem("token");
}
