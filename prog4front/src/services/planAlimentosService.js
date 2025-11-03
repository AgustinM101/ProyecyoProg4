import { api } from "./api";

export const planAlimentosService = {
  createPlan: (data) => {
    const id = data.id_plans_user;
    return api.post(`/userPlanAlimentos/${id}`, data);
  },


  updatePlan: (data) => {
    const id = data.id_plans_user;
    return api.put(`/userPlanAlimentos/${id}`, data);
  },


  getPlanAlimentosByUser: (id) => api.get(`/userPlanAlimentos/${id}`),
};
