import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "@/components/common/Loading";

// Layouts
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const ModeratorLayout = lazy(() => import("@/layouts/ModeratorLayout"));
// Pages
const Dashboard = lazy(() => import("@/pages/moderator/Dashboard"));
const ModeratorNotFound = lazy(() => import("@/pages/moderator/ModeratorNotFound"));
const Login = lazy(() => import("@/pages/moderator/auth/Login"));

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
        path: "moderator",
        element: (
            <Suspense fallback={<Loading />}>
                <ModeratorLayout />
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
