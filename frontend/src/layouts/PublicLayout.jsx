import Loading from "@/components/common/Loading";
import crudService from "@/services/crudService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { lazy, Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";

const Header = lazy(() => import("@/components/client/Header"));
const Footer = lazy(() => import("@/components/client/Footer"));

const PublicLayout = () => {
    const queryClient = useQueryClient();

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

    if (isLoading) {
        return <Loading />;
    }
    
    return (
        <div className="w-full flex flex-col min-h-screen font-DmSans overflow-hidden">
            <Suspense fallback={<Loading />}>
                <Header data={data} />
            </Suspense>
            <main className="grow container mx-auto px-4 sm:px-6 lg:px-8">
                <Outlet />
            </main>
            <Suspense fallback={<Loading />}>
                <Footer />
            </Suspense>
        </div>
    );
};

export default PublicLayout;
