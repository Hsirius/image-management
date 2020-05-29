import axios from "axios";
import { stringify } from "qs";

const request = axios.create({
  baseURL: "http://172.20.10.7:8080",
  //携带cookie
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
  paramsSerializer: (params) => {
    return stringify(params, { arrayFormat: "brackets" });
  },
});

request.interceptors.request.use((req) => {
  req.withCredentials = true;
  return req;
});

request.interceptors.response.use((response) => {
  if (!response.data.success) {
    return Promise.reject(response);
  }
  return { ...response, data: response.data.data };
});

export default request;
