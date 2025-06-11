import React from "react";
import { Link } from "react-router-dom";
import { Popover, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UserProfilePopover from "./UserProfilePopover";
import { isLoggedIn, logout } from "../utils/auth";

const LoginComponent = ({ user }) => {
  // 处理退出登录
  const handleLogout = () => {
    logout(); // 调用登出方法
    // 执行重定向到登录页面
    window.location.href = "/login";
  };

  if (isLoggedIn()) {
    return (
      <Popover
        content={<UserProfilePopover onLogout={handleLogout} user={user} />}
        title={null}
        trigger="click"
        overlayStyle={{ padding: 0 }}
        placement="bottomRight"
      >
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-full transition">
          <Avatar
            size="default"
            icon={<UserOutlined />}
            className="bg-blue-500"
          />
          <span className="hidden lg:inline">{user?.username || "用户"}</span>
        </div>
      </Popover>
    );
  } else {
    return (
      <Link to="/login">
        <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white hover:bg-blue-700 transition">
          登录 &#x1F600;
        </button>
      </Link>
    );
  }
};

export default LoginComponent;
