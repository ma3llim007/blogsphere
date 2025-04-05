import CategorySection from "@/components/client/Home/CategorySection";
import Loader from "@/components/client/Loader";
import Loading from "@/components/common/Loading";
import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { useQuery } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
const HomeBanner = lazy(() => import("@/components/client/Home/HomeBanner"));
const BlogListing = lazy(() => import("@/components/client/Home/BlogListing"));

const Home = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["homeBlogs"],
        queryFn: () => crudService.get("/blog/latest-random-blogs"),
        onError: error => {
            const message = error?.response?.data?.message || error?.message;
            toastService.error(message || "Failed to fetch Data.");
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    const { latestBlogs, randomBlogs } = data?.data || {};
    return (
        <section className="w-full">
            <Suspense fallback={<Loader />}>
                <HomeBanner blogs={randomBlogs} />
            </Suspense>
            <CategorySection />
            <BlogListing bgColor="bg-light" blogs={latestBlogs} />
        </section>
    );
};

export default Home;
