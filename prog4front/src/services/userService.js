import { api } from "./api";


export const userService = {

getCurrentUser: () => api.get('/user'),

getAllUsers: async () => {
    const token = localStorage.getItem("token");
    return await api.get("/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },



}