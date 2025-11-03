import { api } from "./api";

// plansUserService.js
export const plansUserService = {
  getPlansUsers: () => api.get("/plansUsers"),
  getById: (id) => api.get(`/plans/${id}`),
  createPlan: (data) => api.post("/plansUsers", data), // POST para registrar plan de usuario
  updatePlan: (id, data) => api.put(`/plansUsers/${id}`, data),

  
  deletePlan: (id) => api.delete(`/plansUsers/${id}`),

  // Método específico para registrar plan al finalizar compra
  createUserPlan: ({ id_user, id_plan, status, amount }) =>
    api.post("/plansUsers", { id_user, id_plan, status, amount }),



  deletePlan: (id) => api.delete(`/plansUsers/${id}`), 
  getByUserId: (id_user) => api.get(`/plansUsers/${id_user}`), // 👉 usa PlansUserGetByUserController.php

  getMyPlans: () => api.get("/users/me/plans"),
};

