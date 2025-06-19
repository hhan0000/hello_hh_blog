// components/MyIcon.jsx
import React from "react";
import { createFromIconfontCN } from "@ant-design/icons";
import { Space } from "antd";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4954326_pbf9f520khc.js",
});

const MyIcon = ({ type, color = "#1877F2", size = "16px" }) => {
  return (
    <Space>
      <IconFont
        type={type}
        style={{
          color,
          fontSize: size,
        }}
      />
    </Space>
  );
};

export default MyIcon;
