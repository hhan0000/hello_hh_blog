import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Form,
  Input,
  Typography,
  Card,
  Popover,
  Upload,
  message,
  Spin,
  Col,
  Row,
} from "antd";

import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../api/user";
import { setUserInfo } from "../store/reducer/userSlice";

const { Title, Text } = Typography;
const { TextArea } = Input;

const Setting = () => {
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState();
  const [show, setShow] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length > 0) {
      form.setFieldsValue({
        nickname: userInfo.nickname,
        description: userInfo.description,
      });
    }
    setShow(!userInfo?.nickname);
    setShowDesc(!userInfo.description);
  }, [userInfo, form]);

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isImage || !isLt2M) return false;

    const previewUrl = URL.createObjectURL(file);

    console.log(previewUrl, "-------------------------");
    setAvatar(previewUrl); // 临时URL用于预览
    setSelectedFile(file); // 存储原始文件对象

    return false;
  };

  // 新增状态存储文件对象

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append("nickname", values.nickname);
    formData.append("description", values.description);
    if (selectedFile) {
      formData.append("avatar", selectedFile); // 添加二进制文件
    }
    updateUser(formData)
      .then((res) => {
        if (res.code === 200) {
          message.success("更新成功");
          dispatch(setUserInfo(res.data));
          setShow(false); // ✅ 保存后关闭编辑状态
        }
      })
      .finally(() => {
        URL.revokeObjectURL(avatar); // 释放临时URL[8](@ref)
      });
  };

  const NickNameComponent = () => (
    <div className="flex flex-row justify-between items-center w-full">
      <Form.Item
        name="nickname"
        style={{ flex: 1, marginBottom: 0, display: show ? "block" : "none" }}
        rules={[
          {
            required: true,
            message: "请输入昵称",
          },
          {
            max: 30,
            message: "昵称长度不能超过10个字符",
          },
        ]}
      >
        <Input placeholder="请输入昵称" />
      </Form.Item>

      {!show && (
        <div style={{ flex: 1 }}>
          <Text strong>昵称:</Text>
          <Text style={{ marginLeft: 8 }}>
            {form.getFieldValue("nickname") || userInfo?.nickname || "未设置"}
          </Text>
        </div>
      )}

      <Button
        style={{ marginLeft: 20 }}
        onClick={() => {
          if (show) form.setFieldsValue({ nickname: userInfo.nickname });
          setShow(!show);
        }}
      >
        {show ? "取消" : "修改"}
      </Button>
    </div>
  );
  const content = (
    <div className="flex flex-col justify-start items-start w-[60px]">
      <Button className=" border-none ">修改密码</Button>
      <Button className=" border-none ">修改昵称</Button>
      <Button className=" border-none ">修改邮箱</Button>
      <Button className=" border-none ">修改头像</Button>
    </div>
  );
  // ✅ 正确写法
  const Option = () => (
    <Popover content={content} title="Title">
      <Button type="link" className=" border-none ">
        操作
      </Button>
    </Popover>
  );
  const DescConponent = () => (
    <div className="flex flex-row justify-between items-center w-full">
      <Form.Item
        name="description"
        style={{
          flex: 1,
          marginBottom: 0,
          display: showDesc ? "block" : "none",
        }}
        rules={[
          {
            required: true,
            message: "请输入简介",
          },
          {
            max: 100,
            message: "简介长度不能超过100个字符",
          },
        ]}
      >
        <TextArea placeholder="请输入简介" />
      </Form.Item>

      {!showDesc && (
        <div style={{ flex: 1 }}>
          <Text strong>简介:</Text>
          <Text>
            {form.getFieldValue("description") || userInfo?.description}
          </Text>
        </div>
      )}

      <Button
        style={{ marginLeft: 20 }}
        onClick={() => {
          if (showDesc)
            form.setFieldsValue({ description: userInfo.description });
          setShowDesc(!showDesc);
        }}
      >
        {showDesc ? "取消" : "修改"}
      </Button>
    </div>
  );
  const handleCancle = () => {
    form.resetFields();
    navigate(-1);
  };

  if (!userInfo || Object.keys(userInfo).length === 0) {
    return <Spin tip="加载用户信息..." />;
  }
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 24 }}>
      <Title level={4} style={{ marginBottom: 24 }}>
        个人设置
      </Title>
      <Form
        form={form}
        layout="vertical"
        initialValues={userInfo}
        onFinish={onFinish}
      >
        <Card style={{ marginBottom: 24 }} title="基本信息" extra={<Option />}>
          <Row gutter={24}>
            <Col span={8}>
              <Card style={{ marginBottom: 24, border: "none" }}>
                <Title level={5} style={{ marginBottom: 12 }}>
                  用户头像
                </Title>
                <Form.Item label="">
                  <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <Avatar
                      src={avatar || `http://localhost:3000/${userInfo.avatar}`}
                      icon={<UserOutlined />}
                      size={75}
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
                  <Text
                    type="secondary"
                    style={{ display: "block", marginTop: 8 }}
                  >
                    支持JPG, PNG格式，大小不超过2MB
                  </Text>
                </Form.Item>
              </Card>
            </Col>
            <Col span={16}>
              <Card style={{ marginBottom: 24, border: "none" }} hoverable>
                <div style={{ marginBottom: 24 }}>
                  <Text strong>用户名:</Text>
                  <Text style={{ marginLeft: 8 }}>{userInfo?.username}</Text>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <Text strong>邮箱:</Text>
                  <Text style={{ marginLeft: 8 }}>{userInfo?.email}</Text>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <Text strong>昵称:</Text>
                  <Text style={{ marginLeft: 8 }}>{userInfo?.nickname}</Text>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <Text strong>注册时长:</Text>
                  <Text style={{ marginLeft: 16 }}>{userInfo?.createdAt}</Text>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <Text strong>个人简介:</Text>
                  <Text style={{ marginLeft: 8 }}>
                    {userInfo?.description || "未设置"}
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>
        </Card>

        <Card style={{ marginTop: 24 }}>
          <Title level={5} style={{ marginBottom: 24 }}>
            用户昵称
          </Title>
          <NickNameComponent></NickNameComponent>
        </Card>
        <Card style={{ marginTop: 24 }}>
          <Title level={5} style={{ marginBottom: 24 }}>
            个人简介
          </Title>

          <DescConponent></DescConponent>
        </Card>
        <Form.Item style={{ marginTop: 24 }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 16 }}
            >
              保存更改
            </Button>

            <Button onClick={handleCancle}>取消</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Setting;
