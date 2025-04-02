import Loading from "@/components/common/Loading";
import PageHeader from "@/components/common/PageHeader";
import Select from "@/components/common/Select";
import TextArea from "@/components/common/TextArea";
import { Button } from "@/components/ui/button";
import crudService from "@/services/crudService";
import queryClient from "@/services/queryClientConfig";
import toastService from "@/services/toastService";
import { moderatorBlogOptions } from "@/utils/statusUtils";
import { moderatorBlogVerifyScheme } from "@/validation/moderatorScheme";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const VerifyBlog = () => {
    const { blogId } = useParams();
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        setError,
        watch,
    } = useForm({ mode: "onChange", resolver: yupResolver(moderatorBlogVerifyScheme)});

    const { data, isLoading } = useQuery({
        queryKey: ["blog", blogId],
        queryFn: () => crudService.get(`/moderator/blog/blog/${blogId}`),
        onError: err => {
            toastService.error(err?.message || "Failed to fetch Data.");
        },
    });

    // Watch for blogStatus change
    const blogStatus = watch("blogStatus");

    // Reset fields when status changes
    useEffect(() => {
        if (blogStatus !== "Needs Revisions") {
            setValue("revisionMessage", "");
        }
        if (blogStatus !== "Rejected") {
            setValue("rejectedMessage", "");
        }
    }, [blogStatus, setValue]);

    const { mutate, isPending } = useMutation({
        mutationFn: data => crudService.patch(`moderator/blog/review-blog/${blogId}`, data),
        onSuccess: data => {
            navigate("/moderator/blogs/latest-blogs");
            queryClient.invalidateQueries("latestBlog");
            toastService.success(data?.message);
        },
        onError: error => {
            const message = error?.response?.data?.message || error?.message;
            setError("root", { message });
        },
    });

    if (isPending || isLoading) {
        return <Loading />;
    }
    return (
        <>
            <Helmet>
                <title>Review Blog | BlogSphere</title>
                <meta name="description" content="Viewing an existing blog post in BlogSphere admin panel. Manage SEO and content optimization." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <PageHeader homeUrl="/moderator/dashboard" title={"Manage Blogs"} controller={"Blog Listing"} controllerUrl={"/moderator/blogs/latest-blog/"} page={"Verify Blog"} />
            <section className="w-full">
                <div className="my-4 w-full container mx-auto border-t-4 border-blue-700 rounded-lg p-2 bg-gray-100 dark:bg-slate-800">
                    <form onSubmit={handleSubmit(data => mutate(data))} className="space-y-5">
                        <h1 className="text-xl font-bold my-4 px-2">Review Blog</h1>
                        {errors.root && (
                            <div className="w-full my-4 bg-red-500 text-center rounded-md border border-red-600 py-3 px-4">
                                <h4 className="text-white font-bold text-sm">{errors.root.message}</h4>
                            </div>
                        )}
                        <div className="flex flex-wrap gap-4 md:gap-0">
                            <div className="w-2/3 px-2 gap-4 md:gap-0">
                                <Select
                                    label="Blog Status"
                                    placeholder="Select The Blog Status"
                                    title="Select The Blog Status"
                                    options={moderatorBlogOptions}
                                    error={errors.blogStatus?.message}
                                    {...register("blogStatus")}
                                    defaultValue="default"
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
                                />
                            </div>
                        </div>
                        {data?.data?.blogRevisionMessage ? (
                            <div className="w-full px-2">
                                <TextArea
                                    label="Previous Revision Message"
                                    placeholder="View The Previous Revision Message"
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
                                    rows={2}
                                    value={data?.data?.blogRevisionMessage}
                                    readOnly
                                    disabled
                                />
                            </div>
                        ) : null}
                        {blogStatus === "Needs Revisions" ? (
                            <div className="w-full px-2">
                                <TextArea
                                    name="revisionMessage"
                                    label="Revision Message"
                                    placeholder="Enter The Revision Message"
                                    error={errors.revisionMessage?.message}
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
                                    rows={2}
                                    {...register("revisionMessage")}
                                />
                            </div>
                        ) : null}

                        {blogStatus === "Rejected" ? (
                            <div className="w-full px-2">
                                <TextArea
                                    name="rejectedMessage"
                                    label="Rejection Message"
                                    placeholder="Enter The Rejection Message"
                                    error={errors.rejectedMessage?.message}
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
                                    rows={2}
                                    {...register("rejectedMessage")}
                                />
                            </div>
                        ) : null}
                        <div className="w-full border-t flex gap-2 items-center pt-2 mb-1">
                            <Button type="submit" className="Primary cursor-pointer">
                                Verify Blog
                            </Button>
                            {/* |
                             <Link to={"/moderator/blogs/latest-blog/"}>
                                <Button className="Info cursor-pointer">View Blog</Button>
                            </Link>
                            |
                            <Link to={"/moderator/blogs/latest-blog/"}>
                                <Button className="Secondary cursor-pointer">Back To Latest Blog Listing</Button>
                            </Link> */}
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default VerifyBlog;
