import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js"; // 根据你的项目路径调整
export const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(500).json({ message: "请填写完整的注册信息" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar: "",
    });

    await newUser.save();
    res.status(200).json({
      code: 200,
      message: "用户注册成功",
      user: { username: newUser.username, email: newUser.email },
    });
  } catch (err) {
    res.status(500).json({ message: "注册失败", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    console.log("查询结果:", user); // 打印完整用户对象
    if (!user) return res.status(400).json({ message: "用户不存在" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "密码错误" });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "登录成功",
      token,
      code: 200,
      user: {
        username: user.username,
        email: user.email,
        avatar: user.avatar, //
      },
    });
  } catch (err) {
    res.status(500).json({ message: "登录失败", error: err.message });
  }
};
export const getProfile = async (req, res) => {
  try {
    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({ message: "用户未授权" });
    }

    const userId = req.auth.userId;

    const user = await User.findById(userId).select("-password");

    console.log(user);
    if (!user) return res.status(404).json({ message: "用户不存在" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "服务器错误" });
  }
};
export const updateUser = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { username, email } = req.body; // 移除password的明文接收
    const updateData = {
      username: username || user.username,
      email: email || user.email,
    };

    // 处理头像文件
    if (req.file) updateData.avatar = req.file.path;

    // 处理密码加密
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    // 正确更新现有用户
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true } // 返回更新后的文档
    );
    res.status(200).json({
      message: "更新成功",
    });
  } catch (error) {
    res.status(500).json({ message: "服务器错误" });
  }
};
