// src/services/paymentService.js
import { api } from "./api";

export const paymentService = {
  createPaymentPreference: async (payload) => {
    const res = await api.post("/payment", payload);
    return res.data; // devuelvo data directo
  },
  getPaymentById: (id) => api.get(`/payment/${id}`),
  updatePayment: (id, data) => api.put(`/payment/${id}`, data),
};

