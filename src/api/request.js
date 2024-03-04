import axios from "axios";

const baseURL = '/mock';

const service = axios.create({
  baseURL,
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (res) => {
    if (res.status !== 200) {
      return Promise.reject(res);
    } else {
      return res.data;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;