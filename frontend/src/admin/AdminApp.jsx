import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "@/components/Loaders/Loading";

// Layouts
import AuthLayout from "@/layouts/AuthLayout";
import AdminLayout from "@/layouts/AdminLayout";
import ViewWriter from "./pages/admin/Dashboard/ViewWriter";

// Pages
const Login = lazy(() => import("./pages/admin/auth/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard/Dashboard"));
const AdminNotFound = lazy(() => import("./pages/AdminNotFound"));
const AddModerator = lazy(() => import("./pages/admin/Dashboard/AddModerator"));
const ModeratorList = lazy(() => import("./pages/admin/Dashboard/ModeratorList"));
const ViewModerator = lazy(() => import("./pages/admin/Dashboard/ViewModerator"));
const AddWriter = lazy(() => import("./pages/admin/Dashboard/AddWriter"));
const WriterList = lazy(() => import("./pages/admin/Dashboard/WriterList"));

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
                path: "moderator",
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<Loading />}>
                                <AddModerator />
                            </Suspense>
                        ),
                    },
                    {
                        path: "add-moderator",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <AddModerator />
                            </Suspense>
                        ),
                    },
                    {
                        path: "moderator-list",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <ModeratorList />
                            </Suspense>
                        ),
                    },
                    {
                        path: "view-moderator/:moderatorId",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <ViewModerator />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: "writers",
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<Loading />}>
                                <AddWriter />
                            </Suspense>
                        ),
                    },
                    {
                        path: "add-writer",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <AddWriter />
                            </Suspense>
                        ),
                    },
                    {
                        path: "writer-list",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <WriterList />
                            </Suspense>
                        ),
                    },
                    {
                        path: "view-writer/:writerId",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <ViewWriter />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: "*",
                element: (
                    <Suspense fallback={<Loading />}>
                        <AdminNotFound />
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
