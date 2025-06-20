import request from "@/utils/request";

export const getList = (params) => {
  return request({
    url: "/comments/list",
    method: "get",
    params,
  });
};

export const addComment = (data) => {
  return request({
    url: "/comments/add",
    method: "post",
    data,
  });
};
