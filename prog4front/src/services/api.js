import axios from "axios";

const API_BASE_URL = "http://localhost:9091";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptar solicitudes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers["x-api-key"] = token; // token para endpoints protegidos
  return config;
});

// Interceptar respuestas
api.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // redirige si el token no es válido
    }
    return Promise.reject({
      message:
        error.response?.data?.message ||
        "Ocurrió un error sin respuesta del servidor",
    });
  }
);
