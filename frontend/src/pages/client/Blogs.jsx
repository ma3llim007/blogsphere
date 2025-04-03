import { Link } from "react-router-dom";
import PageBanner from "@/components/client/PageBanner";
import Container from "@/components/common/Container";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import BlogCard from "@/components/client/blogs/BlogCard";
import crudService from "@/services/crudService";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Loading from "@/components/common/Loading";
import Loader from "@/components/client/Loader";

const fetchBlogs = async ({ pageParam = 1 }) => {
    const { data } = await crudService.get(`blog/blogs?page=${pageParam}&limit=9`);
    return data;
};

const Blogs = () => {
    const { ref, inView } = useInView();

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey: ["blogs"],
        queryFn: ({ pageParam = 1 }) => fetchBlogs({ pageParam }),
        getNextPageParam: lastPage => (lastPage?.totalPages > lastPage.page ? lastPage.page + 1 : undefined),
    });

    // Trigger fetching when the user scrolls to the bottom
    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage().catch(console.error);
        }
    }, [inView, hasNextPage, fetchNextPage]);

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
                        .flatMap(page => page.blogs)
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
