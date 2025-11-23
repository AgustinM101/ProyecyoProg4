import { api } from "./api";

// userService.js
export const userService = {
  getAllUsers: async () => api.get("/users"),
  getCurrentUser: async () => api.get("/user"),
  getUserPlans: async (userId) => api.get(`/userplans/${userId}`),
  updateProfile: async (formData) =>
  api.post("/user", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }),


    
};

