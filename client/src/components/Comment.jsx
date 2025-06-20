import React, { useEffect } from "react";
// import socket from "../hooks/useSocket.js";
import HHImage from "./HHImage";
import MyIcon from "./Icons/MyIcon.jsx";

const Comment = ({ content }) => {
  const [likeCount, setLikeCount] = React.useState(10);
  const [isDisliked, setIsDisliked] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  console.log("content --------》", content);
  // 加入该评论的房间
  // useEffect(() => {
  //   socket.emit("join_comment_room", commentId);

  //   // 接收点赞事件
  //   socket.on("like_update", (data) => {
  //     if (data.commentId === commentId) {
  //       setLikeCount(data.likeCount);
  //       if (data.userId !== "当前用户ID") {
  //         setIsLiked(data.action === "liked");
  //       }
  //     }
  //   });

  //   return () => {
  //     socket.emit("leave_comment_room", commentId);
  //   };
  // }, [commentId]);

  // const handleLike = async () => {
  //   try {
  //     const res = await axios.post(
  //       `http://localhost:3000/comments/${commentId}/like`,
  //       {
  //         userId: "当前用户ID", // 应该从登录状态获取
  //       }
  //     );
  //     const json = res.data;

  //     if (json.success) {
  //       if (json.action === "liked") {
  //         setLikeCount((prev) => prev + 1);
  //         setIsLiked(true);
  //       } else {
  //         setLikeCount((prev) => prev - 1);
  //         setIsLiked(false);
  //       }
  //     }
  //   } catch (err) {
  //     console.error("点赞失败:", err);
  //   }
  // };
  const Like = () => {
    // Handle like functionality here
    console.log("Liked!");
    setIsLiked((prev) => !prev);
    if (isLiked) {
      setLikeCount(likeCount - 1);
      return;
    }
    setLikeCount(likeCount + 1);
  };
  const Dislike = () => {
    // Handle dislike functionality here
    console.log("Disliked!");
    setIsDisliked((prev) => !prev);
  };
  return (
    <div className="bg-slate-50 rounded-xl mb-8 p-4">
      <div className=" flex items-center gap-4 ">
        <HHImage
          src="userImg.jpeg"
          className="w-10 h-10 rounded-full object-cover"
          width="40"
        />
        <span className="font-medium">
          {content.user?.nickname || content.user?.username}
        </span>
        <span className="text-sm text-gray-500">两小时前</span>
      </div>
      <div className="mt-4 ">
        <p>
          {content.desc || "这是一条评论内容，可能会包含一些有趣的讨论或观点。"}
        </p>
      </div>
      <div>
        <div className="flex items-center gap-2 justify-end mt-4">
          <div className="flex items-center gap-2 mx-4" onClick={Like}>
            <MyIcon
              type={isLiked ? "icon-Like-active" : "icon-Like-normal"}
              color="#1877F2"
            />
            <span className="text-sm">{likeCount}</span>
          </div>
          <div className="flex items-center gap-2" onClick={Dislike}>
            <MyIcon
              type={isDisliked ? "icon-Dislike-active" : "icon-Dislike-normal"}
              color="#FF0000"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
