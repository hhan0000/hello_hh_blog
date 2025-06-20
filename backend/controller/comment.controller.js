import Comment from "../models/comment.model.js";

export const getComments = async (req, res) => {
  const { postId } = req.query;
  const comments = await Comment.find({ post: postId }).populate("user");
  return res.status(200).json({
    data: comments,
    code: 200,
    msg: "获取评论成功",
  });
};

export const addComment = async (req, res) => {
  const { userId, postId, desc } = req.body;

  const comment = await Comment.create({
    user: userId,
    post: postId,
    desc,
  });
  return res.status(200).json({
    msg: "评论添加成功",

    code: 200,
  });
};
