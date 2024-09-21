import AdminBooking from "../pages/Admin/AdminBooking";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminMangeUser from "../pages/Admin/AdminMangeUser";
import AdminServices from "../pages/Admin/AdminServices";
import AdminSlots from "../pages/Admin/AdminSlots";

export const adminRoutes = [
  {
    index: true,
    path: "",
    element: <AdminDashboard />,
  },
  {
    index: true,
    path: "services",
    element: <AdminServices />,
  },
  {
    index: true,
    path: "slots",
    element: <AdminSlots />,
  },
  {
    index: true,
    path: "bookings",
    element: <AdminBooking />,
  },
  {
    index: true,
    path: "manage-users",
    element: <AdminMangeUser />,
  },
];
