import React from "react";
import HHImage from "./HHImage";
import { Link } from "react-router-dom";

const PostListItem = ({ post }) => {
  console.log(post);
  const fullImgUrl = post.img
    ? `http://localhost:3000/${post.img}`
    : "/postImg.jpeg";

  return (
    <div className="flex flex-col xl:flex-row gap-8 ">
      <div className="md:hidden xl:block xl:w-1/3">
        <HHImage
          src={fullImgUrl}
          alt="封面"
          width={735}
          className="rounded-2xl object-cover"
        ></HHImage>
      </div>

      <div className="flex flex-col gap-2 xl:w-2/3">
        <Link to={`/${post.slug}`} className="text-4xl font-semibold">
          {post.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>作者</span>
          <Link className="text-blue-800">张伟杰</Link>
          <span>栏目</span>
          <Link className="text-blue-800"> {post.category}</Link>
          <span>两天前</span>
        </div>
        <p>
          {post.desc}
          {/* 晨光熹微，山茶含露而绽，胭脂色花瓣在薄雾中洇开。布谷声催醒梯田，老农扶犁翻起新泥，黝黑土地蒸腾着温润气息。三两幼犬追逐落英，踏碎溪边金铃般的连翘花影。采蕨妇人竹篮渐满，忽闻山那头飘来货郎摇鼓的叮咚。牧羊少年倚着野樱吹叶笛，雪瓣落满青衿。纸鸢牵着童谣扶摇直上，划破瓷青色的天际。 */}
        </p>
        <Link className="text-blue-800 underline text-sm" to={`/${post.slug}`}>
          更多
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
