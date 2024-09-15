import BookingPage from "../pages/BookingPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ServicePage from "../pages/ServicePage";
import SignUpPage from "../pages/SignUpPage";

export const pageRoutes = [
  {
    index: true,
    element: <HomePage></HomePage>,
  },
  {
    path: "service",
    element: <ServicePage></ServicePage>,
  },
  {
    path: "booking",
    element: <BookingPage></BookingPage>,
  },
  {
        path: "login",
        element: <LoginPage></LoginPage>,
    },
    {
        path: "sign-up",
        element: <SignUpPage></SignUpPage>,
    },

];
