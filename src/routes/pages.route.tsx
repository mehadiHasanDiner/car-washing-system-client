import UserReview from "../pages/UserReview";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ServicePage from "../pages/ServicePage";
import SignUpPage from "../pages/SignUpPage";
import ServiceDetailsPage from "../pages/ServiceDetailsPage";

export const pageRoutes = [
  {
    index: true,
    element: <HomePage></HomePage>,
  },
  {
    index: true,
    path: "services",
    element: <ServicePage></ServicePage>,
  },
  {
    index: true,
    path: "services/:id",
    element: <ServiceDetailsPage></ServiceDetailsPage>,
  },
  {
    index: true,
    path: "user-review",
    element: <UserReview></UserReview>,
  },
  {
    index: true,
    path: "login",
    element: <LoginPage></LoginPage>,
  },
  {
    index: true,
    path: "sign-up",
    element: <SignUpPage></SignUpPage>,
  },
];
