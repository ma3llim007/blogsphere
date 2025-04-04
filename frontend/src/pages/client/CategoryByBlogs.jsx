import { Link, useParams } from "react-router-dom";
import PageBanner from "@/components/client/PageBanner";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { capitalizeWords, slugToText } from "@/utils/utils";
import crudService from "@/services/crudService";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import Loading from "@/components/common/Loading";
import Container from "@/components/common/Container";
import BlogCard from "@/components/client/blogs/BlogCard";
import Loader from "@/components/client/Loader";
import { Button } from "@/components/ui/button";

const fetchBlogs = async ({ pageParam = 1, categorySlug }) => {
    try {
        const { data } = await crudService.get(`blog/category-by-blogs/${categorySlug}?page=${pageParam}&limit=9`);
        return data;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        throw new Error("Failed to load blogs.");
    }
};

const CategoryByBlogs = () => {
    const { category } = useParams();
    const { ref, inView } = useInView();

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey: ["blogs", category],
        queryFn: ({ pageParam }) => fetchBlogs({ pageParam, categorySlug: category }),
        getNextPageParam: lastPage => (lastPage?.totalPages > lastPage.page ? lastPage.page + 1 : undefined),
        enabled: !!category,
    });

    const loadMore = useCallback(() => {
        if (inView && hasNextPage) {
            fetchNextPage().catch(err => console.error("Error fetching next page:", err));
        }
    }, [inView, hasNextPage, fetchNextPage]);

    // Trigger fetching when the user scrolls to the bottom
    useEffect(() => {
        loadMore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    const blogs = data?.pages?.flatMap(page => page.blogs) || [];
    if (isLoading) {
        return <Loading />;
    }
    return (
        <>
            <PageBanner title={capitalizeWords(slugToText(category))}>
                <Breadcrumb>
                    <BreadcrumbList className="text-lg font-bold">
                        <BreadcrumbItem>
                            <Link className="text-black hover:text-blue-violet" to="/">
                                Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link className="text-gray-700 hover:text-blue-violet" to="/blogs">
                                Blogs
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-blue-violet">{capitalizeWords(slugToText(category))}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </PageBanner>
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-7 lg:my-14">
                    {blogs?.length > 0 ? (
                        blogs.map(blog => <BlogCard blog={blog} key={blog?._id} />)
                    ) : (
                        <div className="w-full border py-10 text-center col-span-full space-y-5">
                            <h2 className="text-3xl underline font-bold text-blue-violet underline-offset-7">No Blogs Found For This Category.</h2>
                            <Link to={"/blogs"}>
                                <Button className="Primary btn2xl cursor-pointer">Back To Blogs</Button>
                            </Link>
                        </div>
                    )}
                </div>
                <div ref={ref} className="text-center my-5" aria-live="polite">
                    {isFetchingNextPage ? <Loader text="Loading More Blogs..." /> : null}
                </div>
            </Container>
        </>
    );
};

export default CategoryByBlogs;
