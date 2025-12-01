import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Remove BrowserRouter import
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import CashRegister from "./pages/CashRegister";
import CashLogs from "./pages/CashLogs";
import TaxOverview from "./pages/TaxOverview";
import Reports from "./pages/Reports";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="cash" element={<CashRegister />} />
        <Route path="logs" element={<CashLogs />} />
        <Route path="tax" element={<TaxOverview />} />
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  );
}
