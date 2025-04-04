import { Link } from "react-router-dom";
import PageBanner from "@/components/client/PageBanner";
import Container from "@/components/common/Container";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import BlogCard from "@/components/client/blogs/BlogCard";
import crudService from "@/services/crudService";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import Loading from "@/components/common/Loading";
import Loader from "@/components/client/Loader";

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
        return <Loading />;
    }

    return (
        <>
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
                    {data?.pages
                        .reduce((acc, page) => [...acc, ...page.blogs], [])
                        .map(blog => (
                            <BlogCard blog={blog} key={blog?._id} />
                        ))}
                </div>
            </Container>
            <div ref={ref} className="text-center my-5">
                {isFetchingNextPage ? <Loader text="Loading More Blogs..." /> : null}
            </div>
        </>
    );
};

export default Blogs;
