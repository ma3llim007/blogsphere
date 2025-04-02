import { lazy, Suspense } from "react";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import Loading from "@/components/common/Loading";

const Home = lazy(() => import("@/pages/client/Home"));
const PrivacyPolicy = lazy(() => import("@/pages/client/PrivacyPolicy"));
const TermsConditions = lazy(() => import("@/pages/client/TermsConditions"));

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
            ],
        },
    ]);
    return <RouterProvider router={router} />;
};

export default ClientRoutes;
