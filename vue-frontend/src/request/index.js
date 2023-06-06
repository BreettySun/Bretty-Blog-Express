import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000,
})

// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // console.log(config.headers);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
)

export default http