import CategorySection from "@/components/client/Home/CategorySection";
import Loader from "@/components/client/Loader";
import { lazy, Suspense } from "react";
const HomeBanner = lazy(() => import("@/components/client/Home/HomeBanner"));
const BlogListing = lazy(() => import("@/components/client/Home/BlogListing"));

const Home = () => {
    return (
        <section className="w-full">
            <Suspense fallback={<Loader />}>
                <HomeBanner />
            </Suspense>
            <CategorySection />
            <Suspense fallback={<Loader />}>
                <BlogListing bgColor="bg-light" />
            </Suspense>
        </section>
    );
};

export default Home;
