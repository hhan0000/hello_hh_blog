import React from "react";

import HHImage from "./HHImage";
import MyIcon from "./Icons/MyIcon.jsx";

const Comment = () => {
  const [likeCount, setLikeCount] = React.useState(10);
  const [isDisliked, setIsDisliked] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
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
        <span className="font-medium">张伟杰</span>
        <span className="text-sm text-gray-500">两小时前</span>
      </div>
      <div className="mt-4 ">
        <p>
          这是我父亲的背影。那时我在北京读书，寒假回家，正是腊月二十九日。第二天就是除夕了。那天晚上，我和父亲在车站上等车。父亲要我买橘子，我说：“不要买了，明天就有了。”他不听，非要去买。
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
