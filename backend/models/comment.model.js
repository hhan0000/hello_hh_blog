import { Schema, SchemaType } from "mongoose";
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
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    images: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["active", "deleted", "blocked"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
