import { api } from "./api";

// plansUserService.js
export const plansUserService = {
  getPlansUsers: () => api.get("/plansUsers"),
  getById: (id) => api.get(`/plans/${id}`),
  createPlan: (data) => api.post("/plansUsers", data),
  updatePlan: (id, data) => api.put(`/plansUsers/${id}`, data),
  deletePlan: (id) => api.delete(`/plansUsers/${id}`), 

  getMyPLans: () => api.get("/users/me/plans"),
};
