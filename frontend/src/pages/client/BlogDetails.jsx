import { Link, useParams } from "react-router-dom";
import PageBanner from "@/components/client/PageBanner";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { capitalizeWords, formatDateTime, slugToText } from "@/utils/utils";
import Container from "@/components/common/Container";
import { useQuery } from "@tanstack/react-query";
import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { FaCalendar } from "react-icons/fa";
import Loading from "@/components/common/Loading";
import reactParser from "html-react-parser";
import DOMPurify from "dompurify";
import ScrollProgressBar from "@/components/client/ScrollProgressBar";

const BlogDetails = () => {
    const { blogSlug } = useParams();
    // Fetching the Blog Detail
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["blogDetails", blogSlug],
        queryFn: () => crudService.get(`blog/blog-details/${blogSlug}`),
        onError: error => {
            const message = error?.response?.data?.message || error?.message;
            toastService.error(message || "Failed to fetch Data.");
        },
        enabled: !!blogSlug,
    });

    const { blog, relatedBlogs } = data?.data || {};

    if (isLoading || isFetching) {
        return <Loading />;
    }
    return (
        <>
            <ScrollProgressBar />
            <PageBanner title={slugToText(blogSlug)}>
                <Breadcrumb>
                    <BreadcrumbList className="text-lg font-bold">
                        <BreadcrumbItem>
                            <Link className="text-black hover:text-blue-violet" to="/">
                                Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link className="text-gray-700 hover:text-blue-violet" to={"/blogs"}>
                                Blogs
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-blue-violet">Blog Details</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </PageBanner>
            <Container>
                <div className="flex flex-col gap-5 lg:flex-row my-7 lg:my-14">
                    <div className="grow w-full space-y-5">
                        <img src={blog?.blogFeatureImage} alt={capitalizeWords(blog?.blogTitle)} className="w-full h-auto object-cover rounded" />
                        <div className="flex flex-col items-center text-gray-700 gap-1 sm:flex-row sm:gap-2 sm:text-start">
                            <p>
                                By{" "}
                                <span className="font-bold text-gray-900">
                                    {blog?.blogAuthorId?.firstName} {blog?.blogAuthorId?.lastName}
                                </span>
                            </p>
                            <span className="hidden sm:inline">|</span>
                            <p className="flex items-center gap-2">
                                <FaCalendar />
                                <span>{formatDateTime(blog?.updatedAt)}</span>
                            </p>
                        </div>
                        <div className="w-full my-4 prose lg:prose-xl dark:prose-invert max-w-none">{reactParser(DOMPurify.sanitize(blog?.blogDescription))}</div>
                    </div>
                    <div className="w-full lg:max-w-sm">
                        <h3 className="text-3xl font-bold">Recent Posts</h3>
                        <hr className="border-gray-600" />
                        <div className="flex flex-col gap-4 py-4 items-center justify-center">
                            {relatedBlogs?.map(blog => (
                                <Link to={`/blog-details/${blog?.blogSlug}`} key={blog?._id} className="flex gap-4 bg-light rounded p-2 hover:shadow-md transition-shadow duration-300 w-full">
                                    <div className="max-w-32 min-w-32">
                                        <img className="w-full h-full object-cover rounded" loading="lazy" src={blog?.blogFeatureImage} alt={capitalizeWords(blog?.blogTitle)} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h4 className="font-bold line-clamp-2">{capitalizeWords(blog?.blogTitle)}</h4>
                                        <p className="flex items-center gap-2 text-gray-500 text-sm">
                                            <FaCalendar /> {formatDateTime(blog?.updatedAt)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                            <div></div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default BlogDetails;
