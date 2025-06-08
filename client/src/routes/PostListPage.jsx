import { useState } from "react";
import PostList from "../components/PostList";
import SidderMenu from "../components/SidderMenu";
const PostListPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-8 text-2xl">
      <h1>development blog</h1>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-blue-800 text-white text-sm px-4 py-2 my-4 rounded-2xl md:hidden"
      >
        {open ? "关闭" : "筛选"}
      </button>
      <div className="flex flex-col-reverse md:flex-row gap-8">
        <div className="">
          <PostList />
        </div>
        <div className={`${open ? "block" : "hidden"} md:block`}>
          <SidderMenu />
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
