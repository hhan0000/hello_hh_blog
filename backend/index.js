import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRouter from "./routes/user.route.js";
// const socketIO = require("socket.io");
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import { connectDB } from "./lib/connectDB.js";
import cors from "cors";
// import http from "http";
const app = express();
app.use(cors(process.env.CLIENT_HOST));

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
// 先连接数据库再启动服务
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || "出错了",
    stack: error.stack,
    status: error.status,
  });
});
app.listen(3000, () => {
  connectDB()
    .then(() => {
      console.log("数据库连接成功");
    })
    .catch((err) => {
      console.error("数据库连接失败，服务终止:", err);
    });
  console.log("服务运行在 3000端口");
});
