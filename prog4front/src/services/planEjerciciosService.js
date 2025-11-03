import { api } from "./api";

export const planEjerciciosService = {
  createPlan: (data) => {
    const id = data.id_plans_user;
    return api.post(`/userPlanEjercicios/${id}`, data);
  },

  updatePlan: (data) => {
    const id = data.id_plans_user;
    return api.put(`/userPlanEjercicios/${id}`, data);
  },

  getPlanEjerciciosByUser: (id) => api.get(`/userPlanEjercicios/${id}`),
};
