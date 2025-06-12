import multer from "multer";
import path from "path";

// 自定义文件存储配置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // 上传目录
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // 获取扩展名
    const basename = path.basename(file.originalname, ext);
    const uniqueName = `${Date.now()}-${basename}${ext}`;
    cb(null, uniqueName);
  },
});

// 过滤文件类型（例如仅允许图片）
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("不支持的文件类型"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 限制为 5MB
  },
});

export default upload;
