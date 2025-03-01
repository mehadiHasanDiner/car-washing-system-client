import { ReactNode } from "react";
import { useAppSelector } from "../../../redux/hook";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading, token } = useAppSelector((state: any) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || !token) {
    Cookies.set("redirect", location.pathname);
    navigate("/login");
    return <></>;
  }
  if (user?.role !== "admin") {
    navigate("/");
    return <></>;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
