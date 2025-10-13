import { api } from "./api";

export const formsService = {

  getForms: () => api.get("/forms"),
  getFormByid: (id) => api.get(`/forms/${id}`),
  createForm: (data) => api.post("/forms", data),
  updateForm: (id, data) => api.put(`/forms/${id}`, data),
  deleteForm: (id) => api.delete(`/forms/${id}`)




};
