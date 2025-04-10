import { lazy, Suspense } from "react";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import Loader from "@/components/client/Loader";
import ErrorBoundary from "@/components/ErrorBoundary";
// Page
const Home = lazy(() => import("@/pages/client/Home"));
const PrivacyPolicy = lazy(() => import("@/pages/client/PrivacyPolicy"));
const TermsConditions = lazy(() => import("@/pages/client/TermsConditions"));
const ContactUs = lazy(() => import("@/pages/client/ContactUs"));
const AboutUs = lazy(() => import("@/pages/client/AboutUs"));
const Blogs = lazy(() => import("@/pages/client/Blogs"));
const CategoryByBlogs = lazy(() => import("@/pages/client/CategoryByBlogs"));
const BlogDetails = lazy(() => import("@/pages/client/BlogDetails"));

const ClientRoutes = () => {
    // Defining Routes
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <ErrorBoundary>
                    <PublicLayout />
                </ErrorBoundary>
            ),
            children: [
                {
                    index: true,
                    element: (
                        <Suspense fallback={<Loader />}>
                            <Home />
                        </Suspense>
                    ),
                },
                {
                    path: "about-us",
                    element: (
                        <Suspense fallback={<Loader />}>
                            <AboutUs />
                        </Suspense>
                    ),
                },
                {
                    path: "blogs",
                    element: (
                        <Suspense fallback={<Loader />}>
                            <Blogs />
                        </Suspense>
                    ),
                },
                {
                    path: ":category/blogs",
                    element: (
                        <Suspense fallback={<Loader />}>
                            <CategoryByBlogs />
                        </Suspense>
                    ),
                },
                {
                    path: "blog-details/:blogSlug",
                    element: (
                        <Suspense fallback={<Loader />}>
                            <BlogDetails />
                        </Suspense>
                    ),
                },
                {
                    path: "privacy-policy",
                    element: (
                        <Suspense fallback={<Loader />}>
                            <PrivacyPolicy />
                        </Suspense>
                    ),
                },
                {
                    path: "terms-conditions",
                    element: (
                        <Suspense fallback={<Loader />}>
                            <TermsConditions />
                        </Suspense>
                    ),
                },
                {
                    path: "contact-us",
                    element: (
                        <Suspense fallback={<Loader />}>
                            <ContactUs />
                        </Suspense>
                    ),
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
};

export default ClientRoutes;
