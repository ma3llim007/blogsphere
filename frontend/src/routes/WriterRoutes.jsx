import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "@/components/common/Loading";
// layouts
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const WriterLayout = lazy(() => import("@/layouts/WriterLayout"));
// Pages
const LoginWriter = lazy(() => import("@/pages/writer/auth/LoginWriter"));
const Dashboard = lazy(() => import("@/pages/moderator/Dashboard"));
const WriterNotFound = lazy(() => import("@/pages/writer/WriterNotFound"));
const Account = lazy(() => import("@/pages/writer/Account"));
const ChangePassword = lazy(() => import("@/pages/writer/ChangePassword"));
const UpdateWriterDetails = lazy(() => import("@/pages/writer/UpdateWriterDetails"));

// Defining Routes
const router = createBrowserRouter([
    {
        path: "writer/auth",
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
        path: "/writer",
        element: (
            <Suspense fallback={<Loading />}>
                <WriterLayout />
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
                path: "account",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Account />
                    </Suspense>
                ),
            },
            {
                path: "change-password",
                element: (
                    <Suspense fallback={<Loading />}>
                        <ChangePassword />
                    </Suspense>
                ),
            },
            {
                path: "update-writer-details",
                element: (
                    <Suspense fallback={<Loading />}>
                        <UpdateWriterDetails />
                    </Suspense>
                ),
            },
            {
                path: "*",
                element: (
                    <Suspense fallback={<Loading />}>
                        <WriterNotFound />
                    </Suspense>
                ),
            },
        ],
    },
]);

const WriterRoutes = () => {
    return <RouterProvider router={router} />;
};

export default WriterRoutes;
