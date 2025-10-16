import { api } from "./api";

export const formsService = {

  getForms: async () => api.get("/plansForms"),
  getFormByid: (id) => api.get(`/plansForm/${id}`),
  createForm: (data) => api.post("/plansForm", data),
  updateForm: (id, data) => api.put(`/plansForm/${id}`, data),
  deleteForm: (id) => api.delete(`/plansForm/${id}`)




};
