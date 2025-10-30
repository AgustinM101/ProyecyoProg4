import { api } from "./api";

export const planAlimentosService = {

  getPlans: () => api.get("/planAlimentos"),
  getById: (id) => api.get(`/planAlimentos/${id}`),
  createPlan: (data) => api.post("/planAlimentos", data),
  updatePlan: (id, data) => api.put(`/planAlimentos/${id}`, data),
  deletePlan: (id) => api.delete(`/planAlimentos/${id}`),
  getByUserPlanId: (plansUserId) => api.get(`/userPlanAlimentos/${plansUserId}`),
};