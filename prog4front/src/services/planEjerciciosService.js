import { api } from "./api";

export const planEjerciciosService = {

  getPlans: () => api.get("/planEjercicios"),
  getById: (id) => api.get(`/planEjercicios/${id}`),
  createPlan: (data) => api.post("/planEjercicios", data),
  updatePlan: (id, data) => api.put(`/planEjercicios/${id}`, data),
  deletePlan: (id) => api.delete(`/planEjercicios/${id}`),
 getByPlansUserId: (plansUserId) => api.get(`/userPlanEjercicios?id=${plansUserId}`),

  getPlanPhavId: () => api.get(`/plans/1`),
  getPlanCompeticionId: () => api.get(`/plans/2`)
};
