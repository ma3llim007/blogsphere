import { lazy, Suspense } from "react";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import Loading from "@/components/common/Loading";
// Page
const Home = lazy(() => import("@/pages/client/Home"));
const PrivacyPolicy = lazy(() => import("@/pages/client/PrivacyPolicy"));
const TermsConditions = lazy(() => import("@/pages/client/TermsConditions"));
const ContactUs = lazy(() => import("@/pages/client/ContactUs"));
const AboutUs = lazy(() => import("@/pages/client/AboutUs"));
const Blogs = lazy(() => import("@/pages/client/Blogs"));
const CategoryByBlogs = lazy(() => import("@/pages/client/CategoryByBlogs"));

const ClientRoutes = () => {
    // Defining Routes
    const router = createBrowserRouter([
        {
            path: "/",
            element: <PublicLayout />,
            children: [
                {
                    index: true,
                    element: (
                        <Suspense fallback={<Loading />}>
                            <Home />
                        </Suspense>
                    ),
                },
                {
                    path: "about-us",
                    element: (
                        <Suspense fallback={<Loading />}>
                            <AboutUs />
                        </Suspense>
                    ),
                },
                {
                    path: "blogs",
                    element: (
                        <Suspense fallback={<Loading />}>
                            <Blogs />
                        </Suspense>
                    ),
                },
                {
                    path: ":category/blogs",
                    element: (
                        <Suspense fallback={<Loading />}>
                            <CategoryByBlogs />
                        </Suspense>
                    ),
                },
                {
                    path: "privacy-policy",
                    element: (
                        <Suspense fallback={<Loading />}>
                            <PrivacyPolicy />
                        </Suspense>
                    ),
                },
                {
                    path: "terms-conditions",
                    element: (
                        <Suspense fallback={<Loading />}>
                            <TermsConditions />
                        </Suspense>
                    ),
                },
                {
                    path: "contact-us",
                    element: (
                        <Suspense fallback={<Loading />}>
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
