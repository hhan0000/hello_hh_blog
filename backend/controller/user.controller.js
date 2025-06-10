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
    });

    await newUser.save();
    res.status(200).json({
      message: "用户注册成功",
      username: newUser.username,
      email: newUser.email,
    });
  } catch (err) {
    res.status(500).json({ message: "注册失败", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "用户不存在" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "密码错误" });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "登录成功",
      token,
      code: 200,
      user: { username: user.username, email: user.email, img: user.img },
    });
  } catch (err) {
    res.status(500).json({ message: "登录失败", error: err.message });
  }
};
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ message: "用户不存在" });
  res.json(user);
};
