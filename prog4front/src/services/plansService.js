import { api } from "./api";

export const plansService = {

  getPlans: async () => api.get("/plans"),
  getById: (id) => api.get(`/plans/${id}`),
  createPlan: (data) => api.post("/plans", data),
  updatePlan: (id, data) => api.put(`/plans/${id}`, data),
  deletePlan: (id) => api.delete(`/plans/${id}`),




  getPlanPhavId: () => api.get(`/plans/1`),
  getPlanCompeticionId: () => api.get(`/plans/2`)
};
