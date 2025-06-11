import { nanoid } from "nanoid";
import Post from "../models/post.model.js";

import User from "../models/user.model.js";
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  try {
    const { title, category, desc, content } = req.body;
    const userId = req.auth.userId; // 从 token 中取的用户 id
    const fileInfo = req.file; // 上传的图片信息

    if (!title || !content || !category) {
      return res.status(400).json({ message: "缺少必要字段" });
    }

    if (!userId) {
      return res.status(401).json({ message: "未登录" });
    }

    const slug = nanoid(10); // 生成一个10位的唯一ID

    const newPost = new Post({
      title,
      category,
      desc,
      content,
      slug,
      user: userId,
      img: fileInfo ? fileInfo.path : null,
      createdAt: new Date(),
    });

    await newPost.save();
    res.status(200).json({
      message: "文章已创建",
      slug: newPost.slug,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deletePost = async (req, res) => {
  try {
    const userId = req.auth().userId;

    if (!userId) {
      return res.status(401).json({ message: "未登录" });
    }
    const user = await User.findOne({ clerkUserId });

    const deletePost = await Post.findByIdAndDelete({
      _id: req.params.id,
      user: user._id,
    });
    if (!deletePost) {
      return res.status(403).json({ message: "你只能删除自己的文章" });
    }

    res.status(200).json("文章已删除");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
