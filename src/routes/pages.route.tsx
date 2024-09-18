import UserReview from "../pages/UserReview";
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
    path: "user-review",
    element: <UserReview></UserReview>,
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
