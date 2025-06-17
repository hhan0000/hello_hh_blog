import React from "react";
import { BellOutlined } from "@ant-design/icons";

const Message = () => {
  const arr = [
    {
      id: 1,
      title: "标题1",
      content: "内容",
      time: "2023-05-05",
    },
    {
      id: 2,
      title: "标题2",
      content: "内容",
      time: "2023-05-05",
    },
    {
      id: 3,
      title: "标题3",
      content: "内容",
      time: "2023-05-05",
    },
    {
      id: 4,
      title: "标题4",
      content: "内容",
      time: "2023-05-05",
    },
    {
      id: 5,
      title: "标题5",
      content: "内容",
      time: "2023-05-05",
    },
  ];
  return (
    <div className="mt-2 bg-white box-border">
      <div className="flex flex-col h-[calc(100vh_-_1rem)]">
        <div className="text-lg font-normal box-border m-2 py-2">
          <BellOutlined />
          消息中心
        </div>
        <ul className="flex-1 overflow-auto p-2 mx-2 space-y-2">
          {arr.map((item) => (
            <li
              className="cursor-pointer mt-4 py-2 hover:text-blue-500"
              key={item.id}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Message;
