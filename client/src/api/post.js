import request from "@/utils/request";
// 获取全部
export function getPostList() {
  return request({
    url: "/posts/list",
    method: "get",
  });
}
// 获取单个
export function getPostBySlug(slug) {
  return request({
    url: `/posts/list/${slug}`,
    method: "get",
  });
}

// 创建博客
export function createPost(data) {
  return request({
    url: "/posts/add",
    method: "post",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
