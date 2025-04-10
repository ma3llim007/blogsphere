import { Link } from "react-router-dom";
import PageBanner from "@/components/client/PageBanner";
import Container from "@/components/common/Container";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import BlogCard from "@/components/client/blogs/BlogCard";
import crudService from "@/services/crudService";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import BlogListingSkeleton from "@/components/skeleton/BlogListingSkeleton";
import LoadingBlogsSkeleton from "@/components/skeleton/LoadingBlogsSkeleton";
import { Helmet } from "react-helmet-async";

const fetchBlogs = async ({ pageParam = 1 }) => {
    try {
        const { data } = await crudService.get(`blog/blogs?page=${pageParam}&limit=9`);
        return data;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        throw new Error("Failed to load blogs.");
    }
};

const Blogs = () => {
    const currentUrl = import.meta.env.VITE_BASE_URL;
    const { ref, inView } = useInView();

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey: ["blogs"],
        queryFn: ({ pageParam = 1 }) => fetchBlogs({ pageParam }),
        getNextPageParam: lastPage => (lastPage?.totalPages > lastPage.page ? lastPage.page + 1 : undefined),
    });

    const loadMore = useCallback(() => {
        if (inView && hasNextPage) {
            fetchNextPage().catch(err => console.error("Error fetching next page:", err));
        }
    }, [inView, hasNextPage, fetchNextPage]);

    // Trigger fetching when the user scrolls to the bottom
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(loadMore, [inView]);

    if (isLoading) {
        return <BlogListingSkeleton />;
    }

    const blogs = data?.pages?.flatMap(page => page.blogs) || [];

    return (
        <>
            <Helmet>
                <title>Blogs | BlogSphere - Explore Insightful Blog Posts</title>
                <meta
                    name="description"
                    content="Discover a collection of insightful blog posts on BlogSphere. Browse through articles on various topics, including technology, lifestyle, business, and more."
                />
                <meta name="keywords" content="blog listing, blogs, articles, blog posts, technology blogs, lifestyle blogs, business blogs, BlogSphere" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={currentUrl} />
                {/* Open Graph / Facebook */}
                <meta property="og:title" content="All Blogs | BlogSphere - Explore Insightful Blog Posts" />
                <meta property="og:description" content="Explore a variety of blog posts on BlogSphere. Stay updated on various topics like technology, lifestyle, and business." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${currentUrl}blogs`} />
                <meta property="og:image" content={`${currentUrl}logo.svg`} />
                <meta property="og:site_name" content="BlogSphere" />
                {/* Twitter Card Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="All Blogs | BlogSphere - Explore Insightful Blog Posts" />
                <meta name="twitter:description" content="Browse through a wide selection of blog posts on BlogSphere. Find articles on technology, business, lifestyle, and much more." />
                <meta name="twitter:image" content={`${currentUrl}logo.svg`} />
                {/* Optional Enhancements */}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            </Helmet>
            <PageBanner title="Blogs">
                <Breadcrumb>
                    <BreadcrumbList className="text-lg font-bold">
                        <BreadcrumbItem>
                            <Link className="text-black hover:text-blue-violet" to="/">
                                Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-blue-violet">{"Blogs"}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </PageBanner>
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-7 lg:my-14">
                    {blogs?.length > 0 ? (
                        blogs.map(blog => <BlogCard blog={blog} key={blog?._id} />)
                    ) : (
                        <div className="w-full py-10 text-center col-span-full">
                            <h2 className="text-3xl underline font-bold text-blue-violet underline-offset-9">No Blogs Found</h2>
                        </div>
                    )}
                </div>
            </Container>
            <div ref={ref} className="text-center my-5" aria-live="polite">
                {isFetchingNextPage ? <LoadingBlogsSkeleton /> : null}
            </div>
        </>
    );
};

export default Blogs;
