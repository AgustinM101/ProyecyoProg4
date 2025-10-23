import { api } from "./api";

export const planAlimentosService = {

  getPlans: () => api.get("/planAlimentos"),
  getById: (id) => api.get(`/planAlimentos/${id}`),
  createPlan: (data) => api.post("/planAlimentos", data),
  updatePlan: (id, data) => api.put(`/planAlimentos/${id}`, data),
  deletePlan: (id) => api.delete(`/planAlimentos/${id}`),

  // 🔹 NUEVA FUNCIÓN: obtiene los planes de alimentos por usuario
  getByPlansUserId: (plansUserId) => api.get(`/userPlanAlimentos?id=${plansUserId}`),

  getPlanPhavId: () => api.get(`/plans/1`),
  getPlanCompeticionId: () => api.get(`/plans/2`)
};
