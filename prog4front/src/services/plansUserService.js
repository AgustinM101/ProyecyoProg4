import { api } from "./api";

export const plansUserService = {
  getPlansUsers: () => api.get("/plansUsers"),
  getByUser: (id) => api.get(`/plansUsers/${id}`),
};
