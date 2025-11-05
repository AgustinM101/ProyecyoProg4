import { api } from "./api";

export const plansFormService = {
 
  getPlansForms: () => api.get("/plansForms"),
  getPlansFormsByUser: () => api.get("/plansFormbyuser"),
  getById: (id) => api.get(`/plansForm/${id}`),
  createPlanForms: (data) => api.post("/plansForm", data),
  updatePlan: (id, data) => api.put(`/plansForm/${id}`, data),
  deletePlan: (id) => api.delete(`/plansForm/${id}`),
  getFormFieldsById: (id) => api.get(`/plansForms/${id}`),

  getPlansFormsByPlansUser: (id) => api.get(`/PlansFormsByUserPlanId/${id}`)
};
