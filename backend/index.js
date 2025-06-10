import dotenv from "dotenv";

import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
// import webHookRouter from "./routes/webhook.route.js";
import { connectDB } from "./lib/connectDB.js";
// import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors(process.env.CLIENT_HOST));
// app.use(clerkMiddleware());
// app.use("/webhooks", webHookRouter);
// app.get("/auth", (req, res) => {
//   const anthStatus = req.auth();
//   res.json(anthStatus);
// });

app.use(express.json());
// app.get("/", (req, res) => {});
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
