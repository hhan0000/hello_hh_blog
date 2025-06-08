import { Link } from "react-router-dom";
import { Input } from "antd";
const { Search } = Input;

const SidderMenu = () => {
  return (
    <div className="px-4 h-max sticky top-8">
      <h1 className="mb-4 text-sm font-medium">搜索</h1>
      <div className=" rounded-full flex items-center gap-2">
        <Search
          allowClear
          className="w-full"
          placeholder="输入你要搜索的内容"
          style={{ width: 200 }}
        />
      </div>
      <h1 className="mt-8 mb-4 text-sm font-medium">筛选</h1>
      {/* <div className="flex flex-col gap-2 text-sm">
        <label htmlFor="" className="flex  gap-2 items-center cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="newset"
            className="rounded-sm appearance-none w-4 h-4 border-[3px] text-blue-800 cursor-pointer checked:bg-blue-800 "
          />
        </label>
      </div> */}
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="sort-newest"
            name="sort"
            value="newset"
            className="relative h-4 w-4 appearance-none rounded-sm border-2 bg-white border-gray-300 checked:bg-blue-800 "
          />
          <label
            htmlFor="sort-newest"
            className="ml-2 cursor-pointer text-gray-700"
          >
            最新排序
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="sort-popular"
            name="sort"
            value="popular"
            className="relative h-4 w-4 appearance-none rounded-sm border-2 bg-white border-gray-300 checked:bg-blue-800 "
          />
          <label
            htmlFor="sort-popular"
            className="ml-2 cursor-pointer text-gray-700"
          >
            按热度排序
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="sort-comments"
            name="sort"
            value="comments"
            className="relative h-4 w-4 appearance-none rounded-sm border-2 bg-white   border-gray-300 checked:bg-blue-800"
          />
          <label
            htmlFor="sort-comments"
            className="ml-2 cursor-pointer text-gray-700"
          >
            最多评论
          </label>
        </div>
      </div>
      <h1 className=" mt-8 mb-4 text-sm font-medium">分类</h1>
      <div className="flex flex-col gap-2 text-sm">
        <Link to="/posts" className="underline">
          ALL
        </Link>
        <Link to="/posts?cat=web-design" className="underline">
          Web design
        </Link>
        <Link to="/posts?cat=development" className="underline">
          Development
        </Link>
        <Link to="/posts?cat=database" className="underline">
          Databases
        </Link>
        <Link to="/posts?cat=seo" className="underline">
          Seranch engineeall
        </Link>
        <Link to="/posts?cat=markting" className="underline">
          Markting
        </Link>
      </div>
    </div>
  );
};

export default SidderMenu;
