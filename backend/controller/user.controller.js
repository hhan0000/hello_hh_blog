import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// 注册用户
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const avatar = req.body.avatar || "";

    if (!username || !email || !password) {
      return res.status(400).json({ message: "请填写完整的注册信息" });
    }

    // 检查用户名或邮箱是否已存在
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(409).json({ message: "用户名或邮箱已存在" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar,
    });

    await newUser.save();

    res.status(200).json({
      message: "用户注册成功",
      code: 200,

      user: {
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
        token: "test",
      },
    });
  } catch (err) {
    res.status(500).json({ message: "注册失败", error: err.message });
  }
};

// 用户登录
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "用户不存在" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "密码错误" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      code: 200,
      message: "登录成功",
      token,
      user: {


        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "登录失败", error: err.message });
  }
};

// 获取用户信息（需认证中间件解析 req.auth.userId）
export const getProfile = async (req, res) => {
  try {
    if (!req.auth?.userId) {
      return res.status(401).json({ message: "未授权" });
    }

    const user = await User.findById(req.auth.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "用户不存在" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "服务器错误", error: err.message });
  }
};

// 更新用户信息（支持修改头像、加密密码）
export const updateUser = async (req, res) => {
  try {
    if (!req.auth?.userId) {
      return res.status(401).json({ message: "未授权" });
    }

    const { username, email, password } = req.body;
    const updateData = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;

    // 若有新密码，加密保存
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    // 处理头像上传（假设你使用了 multer，上传后的文件保存在 req.file）
    if (req.file) {
      updateData.avatar = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.auth.userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      message: "用户信息更新成功",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: "更新失败", error: err.message });
  }
};
