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
const Account = lazy(() => import("@/pages/moderator/Account"));
const ChangePassword = lazy(() => import("@/pages/moderator/ChangePassword"));
const UpdateDetails = lazy(() => import("@/pages/moderator/UpdateDetails"));
const LatestBlog = lazy(() => import("@/pages/moderator/blog/LatestBlog"));
const ViewBlog = lazy(() => import("@/pages/moderator/blog/ViewBlog"));
const VerifyBlog = lazy(() => import("@/pages/moderator/blog/VerifyBlog"));
const ApprovedBlogs = lazy(() => import("@/pages/moderator/blog/ApprovedBlogs"));
const NeedsRevisionBlog = lazy(() => import("@/pages/moderator/blog/NeedsRevisionBlog"));

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
                path: "update-moderator-details",
                element: (
                    <Suspense fallback={<Loading />}>
                        <UpdateDetails />
                    </Suspense>
                ),
            },
            {
                path: "blogs",
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
                        path: "latest-blogs",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <LatestBlog />
                            </Suspense>
                        ),
                    },
                    {
                        path: "verify-blog/:blogId",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <VerifyBlog />
                            </Suspense>
                        ),
                    },
                    {
                        path: "view-blog/:blogId",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <ViewBlog />
                            </Suspense>
                        ),
                    },
                    {
                        path: "approved-blogs",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <ApprovedBlogs />
                            </Suspense>
                        ),
                    },
                    {
                        path: "needs-revisions-blogs",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <NeedsRevisionBlog />
                            </Suspense>
                        ),
                    },
                ],
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
