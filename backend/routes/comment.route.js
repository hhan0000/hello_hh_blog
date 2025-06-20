import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getComments, addComment } from "../controller/comment.controller.js";
const router = express.Router();
router.use("/add", authMiddleware, addComment); // 确保只有登录用户可以创建评论
router.use("/list", authMiddleware, getComments);
export default router;
