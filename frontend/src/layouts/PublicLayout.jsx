import Loading from "@/components/common/Loading";
import crudService from "@/services/crudService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { lazy, Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Header = lazy(() => import("@/components/client/Header/Header"));
const Footer = lazy(() => import("@/components/client/Footer"));

const PublicLayout = () => {
    const queryClient = useQueryClient();
    const location = useLocation();

    // Prefetch Data When the components mounts
    useEffect(() => {
        queryClient.prefetchQuery({
            queryKey: ["headerCategory"],
            queryFn: () => crudService.get("category/get-categories"),
            staleTime: 1000 * 60 * 60 * 48, // Data is fresh for 48 hours
            cacheTime: 1000 * 60 * 60 * 72, // Cache remains for 72 hours
        });
    }, [queryClient]);

    const { data, isLoading } = useQuery({
        queryKey: ["headerCategory"],
        queryFn: () => crudService.get("category/get-categories"),
        staleTime: 1000 * 60 * 60 * 48, // 48 hours
        cacheTime: 1000 * 60 * 60 * 72, // 72 hours
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    if (isLoading) {
        return <Loading />;
    }
    return (
        <div className="w-full flex flex-col min-h-screen font-DmSans overflow-hidden">
            <Suspense fallback={<Loading />}>
                <Header categories={data?.data} />
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
