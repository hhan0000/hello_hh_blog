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
  // const clerkUserId = req.auth().userId;
  // console.log(req.headers);
  // console.log("------------>", req.auth());
  // if (!clerkUserId) {
  //   return res.status(401).json({ message: "未登录" });
  // }
  // const user = await User.findOne({ clerkUserId });
  // if (!user) {
  //   return res.status(404).json({ message: "用户不存在" });
  // }
  const newPost = new Post({ ...req.body });
  const post = await newPost.save();
  res.status(200).json(post);
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
