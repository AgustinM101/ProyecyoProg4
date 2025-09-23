import { api } from "./api";

export const userService = {
  getCurrentUser: async () => {
    const token = localStorage.getItem("token");
    return await api.get("/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getAllUsers: async () => {
    const token = localStorage.getItem("token");
    return await api.get("/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getUserPlans: async (userId) => {
    const token = localStorage.getItem("token");
    return await api.get(`/userplans/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

