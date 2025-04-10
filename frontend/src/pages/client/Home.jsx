import BlogListingSkeleton from "@/components/skeleton/BlogListingSkeleton";
import CategorySectionSkeleton from "@/components/skeleton/CategorySectionSkeleton";
import HomeBannerSkeleton from "@/components/skeleton/HomeBannerSkeleton";
import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { useQuery } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
const HomeBanner = lazy(() => import("@/components/client/Home/HomeBanner"));
const BlogListing = lazy(() => import("@/components/client/Home/BlogListing"));
const CategorySection = lazy(() => import("@/components/client/Home/CategorySection"));

const Home = () => {
    const currentUrl = import.meta.env.VITE_BASE_URL;

    const { data, isLoading } = useQuery({
        queryKey: ["homeBlogs"],
        queryFn: () => crudService.get("/blog/latest-random-blogs"),
        onError: error => {
            const message = error?.response?.data?.message || error?.message;
            toastService.error(message || "Failed to fetch Data.");
        },
    });

    if (isLoading) {
        return <HomeBannerSkeleton />;
    }

    const { latestBlogs, randomBlogs } = data?.data || {};
    return (
        <>
            <Helmet>
                <title>BlogSphere - Discover Trending Blogs, Insights, and Stories</title>
                <meta name="description" content="Discover thought-provoking blogs, trending stories, and expert insights across technology, health, travel, and more — only on BlogSphere." />
                <meta name="keywords" content="BlogSphere, blogging platform, trending blogs, latest blogs, tech blogs, health blogs, travel blogs, lifestyle, blogging site" />
                <meta name="author" content="BlogSphere Team" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={currentUrl} />
                {/* Open Graph / Facebook */}
                <meta property="og:title" content="BlogSphere - Discover Trending Blogs, Insights, and Stories" />
                <meta property="og:description" content="Explore the world of blogs – expert opinions, guides, and more on BlogSphere, the home of authentic content." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:image" content={`${currentUrl}logo.svg`} />
                <meta property="og:site_name" content="BlogSphere" />
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="BlogSphere - Discover Trending Blogs, Insights, and Stories" />
                <meta name="twitter:description" content="Stay informed with the latest blog posts across tech, health, and more – curated by BlogSphere." />
                <meta name="twitter:image" content={`${currentUrl}logo.svg`} />
                {/* Optional Enhancements */}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            </Helmet>
            <section className="w-full space-y-6">
                <Suspense fallback={<HomeBannerSkeleton />}>
                    <HomeBanner blogs={randomBlogs} />
                </Suspense>
                <Suspense fallback={<CategorySectionSkeleton />}>
                    <CategorySection />
                </Suspense>
                <Suspense fallback={<BlogListingSkeleton />}>
                    <BlogListing bgColor="bg-light" blogs={latestBlogs} />
                </Suspense>
            </section>
        </>
    );
};

export default Home;
