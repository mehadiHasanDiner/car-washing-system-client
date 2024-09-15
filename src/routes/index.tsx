import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { pageRoutes } from "./pages.route";
import AuthLayout from "../components/Layout/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [...pageRoutes],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [...pageRoutes],
  },
]);

export default router;
