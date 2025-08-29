import { api } from "./api";

export const domainService = {
	getAllDomains: () => api.get("/domains"),
	getDomainById: (id) => api.get("/domains/" + id),
	createDomain: (data) => api.post("/domains", data),
	deleteDomainById: (id) => api.delete("/domains" + id),
};
