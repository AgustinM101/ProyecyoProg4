import { api } from "./api";

export const adminService = {
  validate: async () => {
    try {
      // Llama al endpoint que devuelve el current user
      const res = await api.get("/user");
      return res.data; // { id, email, admin, ... }
    } catch (error) {
      console.error("Error de validación admin:", error);
      return null;
    }
  },
};
