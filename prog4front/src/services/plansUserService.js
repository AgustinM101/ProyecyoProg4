import { api } from "./api";

export const plansUserService = {
  getPlansUsers: () => api.get("/plansUsers"),
  getById: (id) => api.get(`/plans/${id}`),
  createPlan: (data) => api.post("/plansUsers", data), // sin tocar
  updatePlan: (id, data) => api.put(`/plansUsers/${id}`, data),
  deletePlan: (id) => api.delete(`/plansUsers/${id}`),

  // <-- Modificado: createUserPlan recibe expiration_date y envía headers explícitos
  createUserPlan: ({ id_user, id_plan, status, amount, paymentMethod, expiration_date = null }) =>
    api.post(
      "/plansUsers",
      { id_user, id_plan, status, amount, paymentMethod, expiration_date },
      { headers: { "Content-Type": "application/json" } }
    ),


  
  

  getMyPlans: () => api.get("/users/me/plans"),
};


