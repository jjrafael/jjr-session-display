import request from "./request";

export function getSessions() {
  return request({
    url: "/sessions.json",
    method: "get",
  });
}