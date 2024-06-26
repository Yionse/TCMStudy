import { message } from "antd";
import axios from "axios";

const httpInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_BASE_PORT}`,
  timeout: 5000,
  headers: {
    //  存放一些请求头信息
    Authorization: "XXXX-TOKEN",
  },
});

httpInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    message.error("请求错误！");
    return Promise.reject(error);
  }
);

httpInstance.interceptors.response.use(
  (result) => {
    return result.data.data;
  },
  (error) => {
    // message.error("网络错误！");
    // 可根据响应码对结果做不同处理
    message.error(error.message);
    return Promise.reject(error);
  }
);

export function get<T>(url: string, data?: any): any {
  return httpInstance.get<T>(url, { params: data }) as T;
}

export function post<T>(url: string, data?: any): any {
  return httpInstance.post<T>(url, data) as T;
}
