import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "@/components/common/Loading";
// Layouts
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const AdminLayout = lazy(() => import("@/layouts/AdminLayout"));

// Pages
const Login = lazy(() => import("@/pages/admin/auth/Login"));
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
const AdminNotFound = lazy(() => import("@/pages/admin/AdminNotFound"));
const AddModerator = lazy(() => import("@/pages/admin/moderator/AddModerator"));
const ModeratorList = lazy(() => import("@/pages/admin/moderator/ModeratorList"));
const ViewModerator = lazy(() => import("@/pages/admin/moderator/ViewModerator"));
const AddWriter = lazy(() => import("@/pages/admin/writer/AddWriter"));
const WriterList = lazy(() => import("@/pages/admin/writer/WriterList"));
const ViewWriter = lazy(() => import("@/pages/admin/writer/ViewWriter"));
const AddCategory = lazy(() => import("@/pages/admin/category/AddCategory"));
const CategoryList = lazy(() => import("@/pages/admin/category/CategoryList"));
const EditCategory = lazy(() => import("@/pages/admin/category/EditCategory"));
const AllBlogs = lazy(() => import("@/pages/admin/blogs/AllBlogs"));
const ViewBlog = lazy(() => import("@/pages/admin/blogs/ViewBlog"));
const RejectedBlogs = lazy(() => import("@/pages/admin/blogs/RejectedBlogs"));
const RevisionBlogs = lazy(() => import("@/pages/admin/blogs/RevisionBlogs"));

// Defining Routes
const router = createBrowserRouter([
    {
        path: "/admin/auth",
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
        path: "/admin",
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
                path: "category",
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<Loading />}>
                                <AddCategory />
                            </Suspense>
                        ),
                    },
                    {
                        path: "add-category",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <AddCategory />
                            </Suspense>
                        ),
                    },
                    {
                        path: "category-list",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <CategoryList />
                            </Suspense>
                        ),
                    },
                    {
                        path: "edit-category/:categoryId",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <EditCategory />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: "blogs",
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<Loading />}>
                                <AllBlogs />
                            </Suspense>
                        ),
                    },
                    {
                        path: "all-blogs",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <AllBlogs />
                            </Suspense>
                        ),
                    },
                    {
                        path: "revision-blogs",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <RevisionBlogs />
                            </Suspense>
                        ),
                    },
                    {
                        path: "rejected-blogs",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <RejectedBlogs />
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

const AdminRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AdminRoutes;
