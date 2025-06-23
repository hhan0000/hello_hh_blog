import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import { message } from "antd";
import { addComment, getList } from "../api/comment";
const Comments = ({ post }) => {
  const [comments, setComments] = useState([]); // 用于存储评论列表
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log(userInfo);
  useEffect(() => {
    getList({ postId: post.id }).then((res) => {
      // 使用prevComments确保基于最新状态更新
      setComments((prev) => [...res.data, ...prev]);
    });
  }, [post.id]);
  useEffect(() => {
    console.log("comments 已更新：", comments);
  }, [comments]);

  const handleCommentSubmit = async () => {
    if (!commentText.trim() || loading) return;

    setLoading(true);
    try {
      const res = await addComment({
        desc: commentText,
        postId: post.id,
        userId: userInfo.userId,
      });

      if (res.code === 200) {
        // setComments([res.data, ...comments]);
        message.success(res.msg);
        setCommentText("");
        const newRes = await getList({ postId: post.id });
        if (newRes.code === 200 && Array.isArray(newRes.data)) {
          setComments(newRes.data);
          console.log("更新后的评论列表：", newRes.data, comments);
        }
      }
    } catch (err) {
      message.error("提交失败");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-8 lg:w-3/5 my8">
      <h1 className="text-gray-500 underline text-xl">评论区</h1>
      <div className="flex items-center justify-between gap-8 w-full">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="写下你的评论..."
          className="w-full p-4 rounded-xl"
        ></textarea>
        <button
          onClick={handleCommentSubmit}
          className="items-center w-1/6  bg-blue-800 font-medium text-white rounded-xl px-4 py-3 "
        >
          发送
        </button>
      </div>
      {comments.map((comment) => {
        return <Comment key={comment._id} content={comment} />;
      })}
    </div>
  );
};

export default Comments;
