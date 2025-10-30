import { api } from "./api";

// plansUserService.js
export const plansUserService = {
  getPlansUsers: () => api.get("/plansUsers"),
  getById: (id) => api.get(`/plans/${id}`),
  createPlan: (data) => api.post("/plansUsers", data),
  updatePlan: (id, data) => api.put(`/plansUsers/${id}`, data),
  deletePlan: (id) => api.delete(`/plansUsers/${id}`), 
  getByUserId: (id_user) => api.get(`/plansUsers/${id_user}`), // 👉 usa PlansUserGetByUserController.php
  getMyPlans: () => api.get("/users/me/plans"),
};
