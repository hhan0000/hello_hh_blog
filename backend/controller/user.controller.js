import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import validator from "validator";
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
        createdAt: user.createdAt,
        description: user.description,
        nickname: user.nickname,
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

    const { username, email, nickname, description } = req.body;
    const updateData = {};

    if (username) updateData.username = username;
    if (description) updateData.description = description;
    if (email) {
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "邮箱格式不正确" });
      }
      updateData.email = email;
    }
    if (nickname) updateData.nickname = nickname;

    if (req.file) {
      updateData.avatar = req.file.path;
    }
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "没有提供需要更新的信息" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.auth.userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "用户不存在" });
    }

    res.status(200).json({
      message: "用户信息更新成功",
      data: updatedUser,
      code: 200,
    });
  } catch (err) {
    res.status(500).json({ message: "更新失败", error: err.message });
  }
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const userId = req.auth.userId; // 假设你用的是 JWT 或其他登录状态

  try {
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ code: 404, message: "用户不存在" });

    const match = await bcrypt.compare(oldPassword, user.password); // 比对密码
    if (!match)
      return res.status(400).json({ code: 400, message: "旧密码不正确" });

    // 如果匹配，更新新密码
    console.log(newPassword);
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return res.json({ code: 200, message: "密码更新成功" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ code: 500, message: "服务器错误" });
  }
};
