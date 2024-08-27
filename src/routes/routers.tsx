import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import ServicePage from "../pages/ServicePage";
import BookingPage from "../pages/BookingPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
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
    ],
  },
]);

export default router;
