import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div>
            <p>This is admin dashboard</p>
            <Outlet />
        </div>
    );
};

export default AdminDashboard;