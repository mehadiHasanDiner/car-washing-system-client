import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { pageRoutes } from "./pages.route";
import UserDashboard from "../components/Layout/UserDashboard";
import { userRoutes } from "./userRoute";
import UserProtectedRoute from "../components/Layout/ProtectedLayout/UserProtectedRoute";
import AdminProtectedRoute from "../components/Layout/ProtectedLayout/AdminProtectedRoute";
import { adminRoutes } from "./adminRoute";
import AdminDashboard from "../components/Layout/AdminDashboard";

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
        <UserDashboard />
      </UserProtectedRoute>
    ),
    children: [...userRoutes],
  },
  {
    path: "/dashboard-admin",
    element: (
      <AdminProtectedRoute>
        <AdminDashboard />
      </AdminProtectedRoute>
    ),
    children: [...adminRoutes],
  },
]);

export default router;
