import axios from "axios";

export function request(option) {
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000",
    timeout: 5000
  });

  //过滤器（拦截器）
  instance.interceptors.response.use(res => {
    return res.data;
  });

  return instance(option);
}
