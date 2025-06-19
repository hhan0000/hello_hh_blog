import React from "react";
import { createFromIconfontCN } from "@ant-design/icons";
import { Space } from "antd";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4954326_pbf9f520khc.js",
});
const Likes = () => (
  <Space>
    <IconFont type="icon-view" />
    <IconFont type="icon-dianzan" style={{ color: "#1877F2" }} />
    <IconFont type="icon-budianzan" />
  </Space>
);
export default Likes;
