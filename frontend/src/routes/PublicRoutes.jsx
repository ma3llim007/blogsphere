import ClientApp from "@/pages/client/ClientApp";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";

const PublicRoutes = () => {
    // Defining Routes
    const router = createBrowserRouter([
        {
            path: "",
            element: <ClientApp />,
        },
    ]);
    return <RouterProvider router={router} />;
};

export default PublicRoutes;
