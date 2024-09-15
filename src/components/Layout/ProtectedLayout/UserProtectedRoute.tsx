import { ReactNode } from "react";
import { useAppSelector } from "../../../redux/hook";

const UserProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user, isLoading, token } = useAppSelector((state) => state.auth);






    return (
        <div>
            {children}
        </div>
    );
};

export default UserProtectedRoute;