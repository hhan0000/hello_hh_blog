import upload from "../middlewares/upload.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import express from "express";

import {
  getPost,
  getPosts,
  createPost,
  deletePost,
} from "../controller/post.controller.js";
const router = express.Router();

router.get("/list", getPosts);
router.get("/list/:slug", getPost);
router.post("/add", authMiddleware, upload.single("img"), createPost);
router.delete("/:id", deletePost);
export default router;
