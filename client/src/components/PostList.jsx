import React, { useState, useEffect } from "react";
import { getPostList } from "../api/post";
import PostListItem from "./PostListItem";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // 新增加载状态
  const [error, setError] = useState(null);
  useEffect(() => {
    getPostList()
      .then((res) => {
        console.log(res);
        if (!res) throw new Error("API 返回异常");
        setPosts(res);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;
  if (!posts.length) return <div className="text-center py-12">暂无文章</div>;
  return (
    <div className="flex flex-col gap-12  mb-8">
      {posts.map((post) => (
        <PostListItem key={post.slug} post={post} />
      ))}
      {/* <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem /> */}
    </div>
  );
};

export default PostList;
