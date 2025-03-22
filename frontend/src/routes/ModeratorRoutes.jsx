import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "@/components/common/Loading";
import AdminLayout from "@/layouts/AdminLayout";
import Dashboard from "@/pages/moderator/Dashboard";
import ModeratorNotFound from "@/pages/moderator/ModeratorNotFound";

// Layouts
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const LoginWriter = lazy(() => import("@/pages/writer/auth/LoginWriter"));

// Defining Routes
const router = createBrowserRouter([
    {
        path: "moderator/auth",
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
                        <LoginWriter />
                    </Suspense>
                ),
            },
            {
                path: "login",
                element: (
                    <Suspense fallback={<Loading />}>
                        <LoginWriter />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "admin",
        element: (
            <Suspense fallback={<Loading />}>
                <AdminLayout />
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<Loading />}>
                        <Dashboard />
                    </Suspense>
                ),
            },
            {
                path: "dashboard",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Dashboard />
                    </Suspense>
                ),
            },
            {
                path: "*",
                element: (
                    <Suspense fallback={<Loading />}>
                        <ModeratorNotFound />
                    </Suspense>
                ),
            },
        ],
    },
]);

const ModeratorRoutes = () => {
    return <RouterProvider router={router} />;
};

export default ModeratorRoutes;
