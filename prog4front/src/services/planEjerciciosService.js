import { api } from "./api";

export const planEjerciciosService = {

  getPlans: () => api.get("/planEjercicios"),
  getById: (id) => api.get(`/planEjercicios/${id}`),
  createPlan: (data) => api.post("/planEjercicios", data),
  updatePlan: (id, data) => api.put(`/planEjercicios/${id}`, data),
  deletePlan: (id) => api.delete(`/planEjercicios/${id}`),
 getPlanEjerciciosByUser: (id) => api.get(`/userPlanEjercicios?id=${id}`),

};
