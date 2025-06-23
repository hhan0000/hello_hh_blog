// socketAuth.js (修正后)
export const socketAuth = (socket, next) => {
  const token = socket.handshake.query.token;
  if (!token) {
    // ✅ 正确判断无token情况
    return next(new Error("未提供 token"));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = { id: decoded.userId }; // ✅ 附加用户信息
    next();
  } catch (err) {
    next(new Error(`Token无效: ${err.message}`)); // ✅ 详细错误
  }
};
