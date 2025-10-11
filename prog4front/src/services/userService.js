import { api } from "./api";

export const userService = {
  // Trae el usuario logueado
  getCurrentUser: async () => api.get("/user"),

  // Trae todos los usuarios (solo admins)
  getAllUsers: async () => api.get("/api/users"),

  // Trae los planes de un usuario por su ID
  getUserPlans: async (userId) => api.get(`/userplans/${userId}`),

  updateProfile: async (formData) =>
  api.put("/user", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }),

};

