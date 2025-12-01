import axios from "axios";
const BASE = "http://localhost:4000/api";

export const api = axios.create({
  baseURL: BASE,
  timeout: 20000,
});

// example endpoints used by frontend:
export const getDashboard = () => api.get("/dashboard");
export const addCashLog = (payload) => api.post("/cash/logs", payload);
export const getCashLogs = (params) => api.get("/cash/logs", { params });
export const importSales = (payload) => api.post("/sales/import", payload);
export const getTaxSummary = (params) => api.get("/tax/summary", { params });
export const exportReport = (payload) =>
  api.post("/reports/export", payload, { responseType: "blob" });
