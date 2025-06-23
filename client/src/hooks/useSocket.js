// src/socket.js
import { io } from "socket.io-client";
import { getToken } from "../utils/auth";
const token = getToken(); // 获取 token 函数，假设你有这个函数来获取存储在 localStorage 中的 token

const socket = io("http://localhost:3000", {
  query: { token }, // 👈 将Token放在查询参数中
  transports: ["websocket", "polling"], // 强制使用WebSocket协议
});
socket.on("connect", () => {
  console.log("✅ 已连接到 Socket.IO 服务");
});
export default socket;
