import Loading from "@/components/common/Loading";
import { lazy, Suspense } from "react";
const HomeBanner = lazy(() => import("@/components/client/Home/HomeBanner"));
const BlogListing = lazy(() => import("@/components/client/Home/BlogListing"));

const Home = () => {
    return (
        <section className="w-full">
            <Suspense fallback={<Loading />}>
                <HomeBanner />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <BlogListing />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <BlogListing title="technology" bgColor="bg-light" />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <BlogListing title="data science" />
            </Suspense>
        </section>
    );
};

export default Home;
