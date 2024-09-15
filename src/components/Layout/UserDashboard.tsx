import { Outlet } from "react-router-dom";

const UserDashboard = () => {
    return (
        <div>
            <p>This is user Dashboard</p>
            <Outlet />
        </div>
    );
};

export default UserDashboard;