import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "未登录，缺少 token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.auth = {
      userId: decoded.sub || decoded.id, // 根据你生成 token 的方式选择
    };

    next();
  } catch (err) {
    res.status(403).json({ message: "Token 无效", error: err.message });
  }
};
