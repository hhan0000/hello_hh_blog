// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer xxx

  if (!token) return res.status(401).json({ message: "未登录" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // 在 req 中附带用户信息
    next();
  } catch (err) {
    res.status(403).json({ message: "Token 无效" });
  }
};
