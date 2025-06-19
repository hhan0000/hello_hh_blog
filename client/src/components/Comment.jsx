import React from "react";

import HHImage from "./HHImage";
import MyIcon from "./components/MyIcon";

const Comment = () => {
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
        <div className="flex items-center gap-2">
          {/* 点赞区域 */}
          {/* <span>
            <Views></Views>
          </span> */}

          <div className="flex items-center gap-2">
            <MyIcon type="icon-dianzan" color="#1877F2" />
            <p className="text-sm">{100}</p>
          </div>
          <div className="flex items-center gap-2">
            <MyIcon type="icon-budianzan" color="#FF0000" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
