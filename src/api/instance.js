import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    accept: "application/json",
    withCredentials: true,
  },
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${window.localStorage.getItem(
    "token"
  )}`;
  return config;
});

export default instance;
