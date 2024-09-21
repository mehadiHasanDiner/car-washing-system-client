import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import UserDashboardSidebar from "../UserDashboardSidebar";

const UserDashboardLayout = () => {
  return (
    <div>
      <Header />
      <div className="w-full min-h-screen flex items-start justify-center layout_container py-[50px]">
        <div className="min-h-[400px] overflow-auto flex flex-col md:flex-row items-start justify-start gap-[20px] md:p-[25px] rounded-[10px] shadow-md w-full">
          <UserDashboardSidebar />
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboardLayout;
