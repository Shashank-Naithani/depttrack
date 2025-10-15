import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import DepartmentDashboard from "../pages/DepartmentDashboard";
import RoutesProtector from "./RoutesProtector";
import AdminHrDashboard from "../pages/admin/AdminDashboard";
import ManageTasks from "../pages/admin/ManageTasks";

function AppRoutes() {
  return (
    <Routes>
      {/* Common Routes */}
      <Route exact path="/" element={<Login />} />

      {/* Non Admin And Non HR Routes */}
      <Route element={<RoutesProtector />}>
        <Route
          path="/department/:departmentId"
          element={<DepartmentDashboard />}
        />
      </Route>

      {/* Admin And HR Routes */}
      <Route path="/admin" element={<RoutesProtector adminHrOnly={true} />}>
        <Route index element={<AdminHrDashboard />} />
        <Route path="manage-tasks" element={<ManageTasks />} />
      </Route>

      <Route exact path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
