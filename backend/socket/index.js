// socket.js
import { Server } from "socket.io";
import { socketAuth } from "../middlewares/socketAuth.js";
import Comment from "../models/comment.model.js"; // 只需要 Comment 模型

const connectedUsers = new Map();

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173" || "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  io.use(socketAuth); // ✅ 简洁安全

  io.on("connection", (socket) => {
    // 点赞事件
    socket.on("like", async ({ commentId }) => {
      console.log("commentId", commentId);
      const userId = connectedUsers.get(socket.id);
      if (!userId) return;

      try {
        const comment = await Comment.findById(commentId);
        if (!comment) return;

        const alreadyLiked = comment.likes.includes(userId);
        if (alreadyLiked) return;

        comment.likes.push(userId);
        comment.likeCount += 1;
        await comment.save();

        io.emit("likeUpdate", {
          commentId,
          likeCount: comment.likeCount,
        });
      } catch (err) {
        console.error("处理点赞出错:", err);
      }
    });

    // 👇 可选：取消点赞事件
    socket.on("unlike", async ({ commentId }) => {
      const userId = connectedUsers.get(socket.id);
      if (!userId) return;

      try {
        const comment = await Comment.findById(commentId);
        if (!comment) return;

        const index = comment.likes.indexOf(userId);
        if (index === -1) return;

        comment.likes.splice(index, 1);
        comment.likeCount = Math.max(comment.likeCount - 1, 0);
        await comment.save();

        io.emit("likeUpdate", {
          commentId,
          likeCount: comment.likeCount,
        });
      } catch (err) {
        console.error("取消点赞失败:", err);
      }
    });

    socket.on("disconnect", () => {
      connectedUsers.delete(socket.id);
      console.log("用户断开:", socket.id);
    });
  });

  return io;
};
