import { useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
const WritePage = () => {
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (!isSignedIn) {
    return <div>请先登录才能写博客</div>;
  }
  return (
    <div className="h-[calc(100vh-64px)] flex flex-col gap-6 md:h-[calc(100vh-80px)]  ">
      {/* 网页标题 */}
      <h1 className="text-cl font-light ">写一个新的博客</h1>
      <form className="flex flex-col gap-6 flex-1 mb-6">
        <button className="w-max p-2 shadow-md text-sm bg-white text-gray-500 rounded-xl">
          添加一张图片
        </button>
        <input
          className="text-4xl font-semibold bg-transparent outline-none"
          type="text"
          placeholder="标题"
          // className="w-full p-2 border border-gray-300 rounded mt-2"
        />
        <div className="flex items-center gap-4">
          <label htmlFor="" className="text-sm">
            选择博客类型
          </label>
          <select
            name="cat"
            id=""
            className="p-2 rounded-xl bg-white shadow-md"
          >
            <option value="general">General</option>
            <option value="Web-design">Web design</option>
            <option value="developments">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Seranch enginee</option>
            <option value="markting">Markting</option>
          </select>
        </div>
        <textarea
          name=""
          placeholder="一个简短的介绍"
          className="p-4 rounded-xl bg-white shadow-md"
        ></textarea>
        <ReactQuill
          theme="snow"
          className="flex-1  rounded-xl bg-white shadow-md"
        />
        <button className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36">
          发布
        </button>
      </form>
    </div>
  );
};

export default WritePage;
