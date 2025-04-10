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
import { Helmet } from "react-helmet-async";

const BlogDetails = () => {
    const currentUrl = import.meta.env.VITE_BASE_URL;
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
            <Helmet>
                <title>{`${blog?.blogTitle} | BlogSphere - Discover Insights on ${blog?.blogCategory?.categoryName}`}</title>
                <meta name="description" content={blog?.blogShortDescription || "Read the full article to discover more insights, tips, and trends about " + blog?.blogTitle} />
                <meta name="keywords" content={`${blog?.blogTitle}, ${blog?.blogCategory?.categoryName}, ${blog?.blogAuthorId?.firstName} ${blog?.blogAuthorId?.lastName}, BlogSphere`} />
                <meta name="author" content="BlogSphere Team" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`${currentUrl}blog-details/${blogSlug}`} />
                {/* Open Graph / Facebook */}
                <meta property="og:title" content={`${blog?.blogTitle} | BlogSphere - Discover Insights on ${blog?.blogCategory?.categoryName}`} />
                <meta property="og:description" content={blog?.blogShortDescription || "Read the full article to discover more insights, tips, and trends about " + blog?.blogTitle} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`${currentUrl}blog-details/${blogSlug}`} />
                <meta property="og:image" content={blog?.featuredImage || `${currentUrl}logo.svg`} />
                <meta property="og:site_name" content="BlogSphere" />
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${blog?.blogTitle} | BlogSphere - Discover Insights on ${blog?.blogCategory?.categoryName}`} />
                <meta name="twitter:description" content={blog?.blogShortDescription || "Read the full article to discover more insights, tips, and trends about " + blog?.blogTitle} />
                <meta name="twitter:image" content={blog?.featuredImage || `${currentUrl}logo.svg`} />
                {/* Optional Enhancements */}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            </Helmet>
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
