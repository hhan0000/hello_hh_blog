import React, { useState } from "react";
import {
  Avatar,
  Button,
  Form,
  Input,
  Typography,
  Card,
  Upload,
  message,
} from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;

const Setting = () => {
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState("");

  // 初始用户数据
  const initialValues = {
    username: "旅行者",
    bio: "热爱探索世界的开发者",
  };

  // 账户信息（只读）
  const accountInfo = {
    account: "user123@example.com",
    userId: `UID-${Math.floor(Math.random() * 1000000)}`,
  };

  // 头像上传前的验证
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("只能上传图片文件!");
      return false;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("图片大小不能超过2MB!");
      return false;
    }

    // 读取文件并设置为头像
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result);
    };
    reader.readAsDataURL(file);

    return false; // 阻止默认上传行为
  };

  const onFinish = (values) => {
    console.log("保存的用户信息:", {
      ...values,
      avatar,
    });
    message.success("用户信息已更新！");
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <Title level={4} style={{ marginBottom: 24 }}>
        个人设置
      </Title>

      {/* 账户信息（只读） */}
      <Card title="账户信息" style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <Text strong>账号:</Text>
          <Text style={{ marginLeft: 8 }}>{accountInfo.account}</Text>
        </div>
        <div>
          <Text strong>用户ID:</Text>
          <Text style={{ marginLeft: 8 }}>{accountInfo.userId}</Text>
        </div>
      </Card>

      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        {/* 头像设置 */}
        <Form.Item label="头像">
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <Avatar
              src={avatar}
              icon={<UserOutlined />}
              size={100}
              style={{ marginRight: 16 }}
            />
            <Upload
              name="avatar"
              showUploadList={false}
              beforeUpload={beforeUpload}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>更换头像</Button>
            </Upload>
          </div>
          <Text type="secondary" style={{ display: "block", marginTop: 8 }}>
            支持JPG, PNG格式，大小不超过2MB
          </Text>
        </Form.Item>

        {/* 用户名设置 */}
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            { required: true, message: "请输入用户名!" },
            { min: 2, message: "用户名至少2个字符!" },
            { max: 20, message: "用户名最多20个字符!" },
          ]}
        >
          <Input placeholder="请输入用户名" maxLength={20} />
        </Form.Item>

        {/* 个人简介 */}
        <Form.Item
          label="个人简介"
          name="bio"
          rules={[{ max: 200, message: "个人简介最多200个字符!" }]}
        >
          <TextArea
            rows={4}
            placeholder="介绍一下自己..."
            maxLength={200}
            showCount
          />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 16 }}
            >
              保存更改
            </Button>
            <Button onClick={() => form.resetFields()}>取消</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Setting;
