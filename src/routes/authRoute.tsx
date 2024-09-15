import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";


export const authRoutes = [
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
]