import { api } from "./api";

export const plansFormService = {
  // Obtener todos los formularios
  getPlansForms: () => api.get("/plansForm"),

  // Obtener un formulario por ID
  getById: (id) => api.get(`/plansForm/${id}`),

  // Crear un nuevo formulario
  create: (data) =>
    api.post("/plansForm", data, {
      headers: { "Content-Type": "application/json" },
    }),

  // Alias opcional
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
};
