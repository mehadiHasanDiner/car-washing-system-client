import { ReactNode } from "react";
import { useAppSelector } from "../../../redux/hook";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAppSelector((state) => state.auth);

  if (!token) {
    toast.error("You are not authorized.");
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
};

export default UserProtectedRoute;
