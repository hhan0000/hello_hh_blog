import request from "@/utils/request";
// 获取全部
export function getPostList(params = {}) {
  return request({
    url: "/posts/list",
    method: "get",
    params,
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

// 修改博客
export function updatePost(id, data) {
  return request({
    url: `/posts/update/${id}`,
    method: "post",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
