import BookingPage from "../pages/BookingPage";
import HomePage from "../pages/HomePage";
import ServicePage from "../pages/ServicePage";

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
        
    }
]