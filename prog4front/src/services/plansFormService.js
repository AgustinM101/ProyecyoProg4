import { api } from "./api";

export const plansFormService = {
 
  getPlansForms: () => api.get("/plansForms"),

  getPlansFormsByUser: () => api.get("/plansFormbyuser"),

   getPlansFormsByUser: (userId) => api.get(`/plansForms/user/${userId}`),
 
  getPlansFormsByUser: () => api.get("/plansForms/user"),

  getById: (id) => api.get(`/plansForm/${id}`),




  createPlanForms: (data) =>
    api.post("/plansForm", data, {
      headers: { "Content-Type": "application/json" },
    }),

  // Actualizar un formulario existente
  updatePlan: (id, data) =>
    api.put(`/plansForm/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    }),

  // Eliminar un formulario
  deletePlan: (id) => api.delete(`/plansForm/${id}`),

   // Traer definición de campos de un formulario por ID (opcional)
  getFormFieldsById: (id) => api.get(`/plansForms/${id}`),
};
