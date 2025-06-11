import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 修改这里
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { getToken, isLoggedIn } from "../utils/auth";
import { getUserInfo } from "../api/user";
import { createPost } from "../api/post";
import { message } from "antd";

const WritePage = () => {
  const navigate = useNavigate(); // 使用 useNavigate 代替 useHistory
  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // 添加状态
  const [isSubmitting, setIsSubmitting] = useState(false); // 提交状态
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "general",
    desc: "",
    content: "",
    img: null,
  });
  const token = getToken();
  useEffect(() => {
    if (token) {
      getUserInfo().then((res) => {
        setUser(res);
      });
    }
  }, [token]);
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);
  if (!isLoggedIn()) {
    return <div>请先登录才能写博客</div>;
  }

  // 处理文本/选择框输入
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 富文本内容
  const handleContentChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  // 图片上传
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 清理旧的 preview URL
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData((prev) => ({ ...prev, img: file }));
    }
  };

  // 提交表单
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    if (!user || !user._id) {
      message.error("无法获取用户信息，请重新登录");
      setIsSubmitting(false);
      return;
    }
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("desc", formData.desc);
      data.append("content", formData.content);
      if (formData.img) {
        data.append("img", formData.img);
      }
      data.append("user", user._id);
      data.append("createBy", user.username);
      const response = await createPost(data);
      console.log(response.slug);
      if (response.slug) {
        message.success({
          content: "文章发布成功！",
          duration: 1.5,
        });
        setTimeout(() => {
          // 使用 navigate 代替 history.push
          navigate(`/${response.slug}`);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      message.error({
        content: err.response?.data?.message || "发布失败",
        duration: 1.5,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col gap-6 md:h-[calc(100vh-80px)]">
      <h1 className="text-cl font-light">写一个新的博客</h1>
      <form className="flex flex-col gap-6 flex-1 mb-6" onSubmit={handleSubmit}>
        {/* 上传按钮 */}
        <label className="w-max p-2 shadow-md text-sm bg-white text-gray-500 rounded-xl cursor-pointer">
          添加一张图片
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            hidden
          />
        </label>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="预览图"
            className="w-1/2 h-auto rounded shadow-md"
          />
        )}
        <input
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="text-4xl font-semibold bg-transparent outline-none"
          type="text"
          placeholder="标题"
          required
        />

        <div className="flex items-center gap-4">
          <label className="text-sm">选择博客类型</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="p-2 rounded-xl bg-white shadow-md"
          >
            <option value="general">General</option>
            <option value="Web-design">Web design</option>
            <option value="developments">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engine</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>

        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleInputChange}
          placeholder="一个简短的介绍"
          className="p-4 rounded-xl bg-white shadow-md"
        ></textarea>

        <ReactQuill
          theme="snow"
          value={formData.content}
          onChange={handleContentChange}
          className="flex-1 rounded-xl bg-white shadow-md"
        />

        {error && <div className="text-red-600">{error}</div>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36"
        >
          {isSubmitting ? "发布中..." : "发布"}
        </button>
      </form>
    </div>
  );
};

export default WritePage;
