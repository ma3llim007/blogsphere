import CategorySection from "@/components/client/Home/CategorySection";
import Loader from "@/components/client/Loader";
import Loading from "@/components/common/Loading";
import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { useQuery } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
const HomeBanner = lazy(() => import("@/components/client/Home/HomeBanner"));
const BlogListing = lazy(() => import("@/components/client/Home/BlogListing"));

const Home = () => {
    const currentUrl = `${import.meta.env.VITE_BASE_URL}`;

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
        <>
            <Helmet>
                <title>Sameer Blogs | Personal Growth, Tech, and Inspiration</title>
                <meta name="description" content="Welcome to Sameer Blogs — explore insightful content on self improvement, technology, and productivity to level up your life." />
                <meta name="keywords" content="self improvement, tech blogs, productivity, personal development, Sameer Blogs" />
                <meta name="author" content="Mohd Sameer" />
                <link rel="canonical" href={currentUrl} />
                {/* Open Graph (Facebook, LinkedIn) */}
                <meta property="og:title" content="Sameer Blogs | Personal Growth, Tech, and Inspiration" />
                <meta property="og:description" content="Explore blogs on self improvement, tech, and productivity." />
                <meta property="og:image" content={`${currentUrl}/logo.svg`} />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:type" content="website" />
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Sameer Blogs | Personal Growth, Tech, and Inspiration" />
                <meta name="twitter:description" content="Read about personal growth, self improvement, and tech on Sameer Blogs." />
                <meta name="twitter:image" content={`${currentUrl}/logo.svg`} />
            </Helmet>
            <section className="w-full">
                <Suspense fallback={<Loader />}>
                    <HomeBanner blogs={randomBlogs} />
                </Suspense>
                <CategorySection />
                <BlogListing bgColor="bg-light" blogs={latestBlogs} />
            </section>
        </>
    );
};

export default Home;
