import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { pageRoutes } from "./pages.route";
import UserDashboardLayout from "../components/Layout/UserDashboardLayout";
import { userRoutes } from "./userRoute";
import UserProtectedRoute from "../components/Layout/ProtectedLayout/UserProtectedRoute";
import AdminProtectedRoute from "../components/Layout/ProtectedLayout/AdminProtectedRoute";
import { adminRoutes } from "./adminRoute";
import AdminDashboardLayout from "../components/Layout/AdminDashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [...pageRoutes],
  },

  {
    path: "/dashboard-user",
    element: (
      <UserProtectedRoute>
        <UserDashboardLayout />
      </UserProtectedRoute>
    ),
    children: [...userRoutes],
  },
  {
    path: "/dashboard-admin",
    element: (
      <AdminProtectedRoute>
        <AdminDashboardLayout />
      </AdminProtectedRoute>
    ),
    children: [...adminRoutes],
  },
]);

export default router;
