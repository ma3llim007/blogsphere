import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "@/components/Loaders/Loading";

// Layouts
import AuthLayout from "@/layouts/AuthLayout";

// Pages
const Login = lazy(() => import("./pages/admin/auth/Login"));

// Defining Routes
const router = createBrowserRouter([
    {
        path: "admin/auth",
        element: (
            <Suspense fallback={<Loading />}>
                <AuthLayout />
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<Loading />}>
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: "login",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Login />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "admin",
        element: (
            <Suspense fallback={<Loading />}>
                <AuthLayout />
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<Loading />}>
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: "login",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Login />
                    </Suspense>
                ),
            },
        ],
    },
]);

const AdminApp = () => {
    return <RouterProvider router={router} />;
};

export default AdminApp;
