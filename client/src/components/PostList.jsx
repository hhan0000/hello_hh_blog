import React from "react";
import PostListItem from "./PostListItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const fetchPosts = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
  return res.data;
};
const PostList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetchPosts(),
  });
  // if (isPending) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }
  console.log("data---------------------", data);
  return (
    <div className="flex flex-col gap-12  mb-8">
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
      <PostListItem />
      <PostListItem />
    </div>
  );
};

export default PostList;
