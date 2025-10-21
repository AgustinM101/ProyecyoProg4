import { api } from "./api";

export const logsService = {
  getLogs: async () => api.get("/logs"),
};
