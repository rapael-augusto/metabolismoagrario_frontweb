import axios from "axios";

const url = process.env.API_URL;

const api = axios.create({
  baseURL: url || "http://127.0.0.1:3333/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("@token");
    console.log("Interceptor", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
