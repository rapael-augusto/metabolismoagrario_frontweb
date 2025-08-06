import { getSession } from "@/libs/sessionLib";
import axios from "axios";
import { cookies } from "next/headers";
import { toast } from "react-toastify";

const url = process.env.API_URL;

const api = axios.create({
  baseURL: url || "http://127.0.0.1:3333/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const { token } = await getSession();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.code === "ECONNABORTED" ||
      error.message?.includes("Network Error") ||
      error.response === undefined
    ) {
      toast.error(
        "Não foi possível conectar ao servidor. Tente novamente mais tarde."
      );
    }
    return Promise.reject(error);
  }
);

export default api;
