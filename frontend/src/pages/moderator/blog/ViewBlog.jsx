import Input from "@/components/common/Input";
import Loading from "@/components/common/Loading";
import PageHeader from "@/components/common/PageHeader";
import RichTextEditor from "@/components/common/RichTextEditor";
import Select from "@/components/common/Select";
import TextArea from "@/components/common/TextArea";
import { Button } from "@/components/ui/button";
import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { allBlogOptions } from "@/utils/statusUtils";
import { editBlogScheme } from "@/validation/writerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaBackward } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";

const ViewBlog = () => {
    const { blogId } = useParams();
    const location = useLocation();

    const {
        register,
        formState: { errors },
        setValue,
        control,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(editBlogScheme),
    });

    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ["blog", blogId],
        queryFn: () => crudService.get(`/moderator/blog/blog/${blogId}`, true),
        onError: err => {
            toastService.error(err?.message || "Failed to fetch Data.");
        },
    });

    useEffect(() => {
        if (data?.data && isSuccess) {
            const { blogTitle, blogSlug, blogShortDescription, blogDescription, blogCategory, blogStatus } = data?.data || {};
            setValue("blogTitle", blogTitle);
            setValue("blogSlug", blogSlug);
            setValue("blogShortDescription", blogShortDescription);
            setValue("blogDescription", blogDescription);
            setValue("blogCategory", blogCategory.categoryName);
            setValue("blogStatus", blogStatus);
        }
    }, [isSuccess, data, setValue]);

    if (isLoading) return <Loading />;
    return (
        <>
            <Helmet>
                <title>View Blog Post | BlogSphere</title>
                <meta name="description" content="Viewing an existing blog post in BlogSphere admin panel. Manage SEO and content optimization." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <PageHeader homeUrl="/moderator/dashboard" title={"Manage Blogs"} controller={"Blog Listing"} controllerUrl={location.pathname} page={"View Blog"} />
            <section className="w-full">
                <div className="my-4 w-full container mx-auto border-t-4 border-blue-700 rounded-lg p-2 bg-gray-100 dark:bg-slate-800">
                    <form className="space-y-5">
                        <h1 className="text-xl font-bold my-4 px-2">View Blog</h1>
                        {errors.root && (
                            <div className="w-full my-4 bg-red-500 text-center rounded-md border border-red-600 py-3 px-4">
                                <h4 className="text-white font-bold text-sm">{errors.root.message}</h4>
                            </div>
                        )}
                        <div className="flex flex-wrap gap-4 md:gap-0">
                            <div className="w-full px-2">
                                <Input
                                    label="Blog Title"
                                    placeholder="Enter The Blog Title"
                                    {...register("blogTitle")}
                                    disabled
                                    readOnly
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    error={errors.blogTitle?.message}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 md:gap-0">
                            <div className="w-full px-2">
                                <Input
                                    label="Blog Slug"
                                    placeholder="View The Blog Slug"
                                    {...register("blogSlug")}
                                    disabled
                                    readOnly
                                    onPaste={e => e.preventDefault()}
                                    onCopy={e => e.preventDefault()}
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    error={errors.blogSlug?.message}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 md:gap-0">
                            <div className="w-full md:w-1/2 px-2 gap-4 md:gap-0">
                                <div className="w-full">
                                    <label className="inline-block mb-2 pl-1 text-base font-bold">Blog Feature Image</label>
                                    <img src={data?.data?.blogFeatureImage} className="max-w-60 max-h-60 object-cover rounded" alt="Blog Feature Image" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 md:gap-0">
                            <div className="w-full md:w-1/2 px-2 gap-4 md:gap-0">
                                <Input
                                    label="Category"
                                    placeholder="View The Category"
                                    {...register("blogCategory")}
                                    disabled
                                    readOnly
                                    onPaste={e => e.preventDefault()}
                                    onCopy={e => e.preventDefault()}
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    error={errors.blogCategory?.message}
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-2 gap-4 md:gap-0">
                                <Select
                                    label="Blog Status"
                                    placeholder="View The Blog Status"
                                    title="View The Blog Status"
                                    options={allBlogOptions}
                                    error={errors.blogStatus?.message}
                                    {...register("blogStatus")}
                                    defaultValue={data?.data?.blogStatus}
                                    disabled
                                    readOnly
                                />
                            </div>
                        </div>
                        {data?.data?.blogStatus === "Needs Revisions" ? (
                            <div className="w-full px-2">
                                <TextArea
                                    name="Needs Revisions"
                                    label="Needs Revisions"
                                    placeholder="View Needs Revisions"
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
                                    rows={5}
                                    value={data?.data?.blogRevisionMessage || ""}
                                    readOnly
                                    disabled
                                />
                            </div>
                        ) : null}
                        {data?.data?.blogStatus === "Rejected" ? (
                            <div className="w-full px-2">
                                <TextArea
                                    name="Needs Revisions"
                                    label="Needs Revisions"
                                    placeholder="View Needs Revisions"
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
                                    rows={5}
                                    value={data?.data?.blogRejectedMessage}
                                />
                            </div>
                        ) : null}
                        <div className="w-full px-2">
                            <TextArea
                                name="blogShortDescription"
                                label="Blog Short Description"
                                placeholder="Enter The Blog Short Description"
                                error={errors.blogShortDescription?.message}
                                className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
                                rows={2}
                                {...register("blogShortDescription")}
                                disabled
                                readOnly
                            />
                        </div>
                        <div className="w-full px-2">
                            <Suspense fallback={<Loading />}>
                                <RichTextEditor
                                    name="blogDescription"
                                    label="Blog Description"
                                    control={control}
                                    placeholder="Enter The Product Description"
                                    {...register("blogDescription")}
                                    error={errors.blogDescription?.message}
                                    className="text-xl rounded-sm focus:ring-2 focus:ring-blue-800"
                                    disabled
                                    readOnly
                                />
                            </Suspense>
                        </div>
                        <div className="w-full border-t">
                            <Link to={-1}>
                                <Button className="Secondary mt-4 cursor-pointer">
                                    <FaBackward /> Back To Blog Listing
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default ViewBlog;
