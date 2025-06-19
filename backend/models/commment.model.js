import { Schema } from "mongoose";
import mongoose from "mongoose";

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    // 新增字段
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ], // 点赞用户列表
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    isPinned: {
      type: Boolean,
      default: false,
    }, // 是否置顶评论
    isEdited: {
      type: Boolean,
      default: false,
    }, // 是否被编辑过
    images: [
      {
        type: String, // 图片 URL 或文件路径
      },
    ], // 评论附带图片
    status: {
      type: String,
      enum: ["active", "deleted", "blocked"],
      default: "active",
    }, // 评论状态
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
