import UpdateUserProfile from "../pages/User/UpdateUserProfile";
import UserMyBooking from "../pages/User/UserMyBooking";
import UserProfile from "../pages/User/UserProfile";

export const userRoutes = [
  {
    index: true,
    path: "",
    element: <UserProfile />,
  },
  {
    index: true,
    path: "update-info",
    element: <UpdateUserProfile />,
  },
  {
    index: true,
    path: "my-bookings",
    element: <UserMyBooking />,
  },
];
