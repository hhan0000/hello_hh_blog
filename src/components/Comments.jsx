import React from "react";
import Comment from "./Comment";
const Comments = () => {
  return (
    <div className="flex flex-col gap-8 lg:w-3/5">
      <h1 className="text-gray-500 underline text-xl">评论区</h1>
      <div className="flex items-center justify-between gap-8 w-full">
        <textarea
          placeholder="写下你的评论..."
          className="w-full p-4 rounded-xl"
        ></textarea>
        <button className="items-center w-1/6  bg-blue-800 font-medium text-white rounded-xl px-4 py-3 ">
          发送
        </button>
      </div>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};

export default Comments;
