import Loading from "@/components/common/Loading";
import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

const Header = lazy(() => import("@/components/client/Header"));
const Footer = lazy(() => import("@/components/client/Footer"));

const PublicLayout = () => {
    return (
        <div className="w-full flex flex-col min-h-screen">
            <Suspense fallback={<Loading />}>
                <Header />
            </Suspense>
            <main className="grow">
                <Outlet />
            </main>
            <Suspense fallback={<Loading />}>
                <Footer />
            </Suspense>
        </div>
    );
};

export default PublicLayout;
