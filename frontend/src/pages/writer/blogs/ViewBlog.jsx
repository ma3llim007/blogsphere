import Input from "@/components/common/Input";
import Loading from "@/components/common/Loading";
import PageHeader from "@/components/common/PageHeader";
import RichTextEditor from "@/components/common/RichTextEditor";
import Select from "@/components/common/Select";
import TextArea from "@/components/common/TextArea";
import { Button } from "@/components/ui/button";
import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { writerBlogOptions } from "@/utils/statusUtils";
import { editBlogScheme } from "@/validation/writerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaBackward } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const ViewBlog = () => {
    const { blogId } = useParams();

    const {
        register,
        formState: { errors },
        setValue,
        control,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(editBlogScheme),
    });

    // get the cateogry for options
    const { data: categoryOptions, isLoading: categoryOptionsIsLoading } = useQuery({
        queryKey: ["categoryOptions"],
        queryFn: () => crudService.get("/writer/blog/options-category", true),
        onError: err => {
            toastService.error(err?.message || "Failed to fetch Data.");
        },
    });

    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ["blog", blogId],
        queryFn: () => crudService.get(`/writer/blog/blog/${blogId}`, true),
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
            setValue("blogCategory", blogCategory);
            setValue("blogStatus", blogStatus);
        }
    }, [isSuccess, data, setValue]);

    if (isLoading || categoryOptionsIsLoading) return <Loading />;
    return (
        <>
            <Helmet>
                <title>View Blog Post | BlogSphere</title>
                <meta name="description" content="Viewing an existing blog post in BlogSphere admin panel. Manage SEO and content optimization." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <PageHeader homeUrl="/writer/dashboard" title={"Manage Blogs"} controller={"Blog Listing"} controllerUrl={"/writer/blogs/add-blog/"} page={"View Blog"} />
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
                            <div className="w-full md:w-1/2 px-2 gap-4 md:gap-0">
                                <div className="w-full">
                                    <label className="inline-block mb-2 pl-1 text-base font-bold">Blog Details Image</label>
                                    <img src={data?.data?.blogDetailImage} className="max-w-60 max-h-60 object-cover rounded" alt="Blog Feature Image" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 md:gap-0">
                            <div className="w-full md:w-1/2 px-2 gap-4 md:gap-0">
                                <Select
                                    label="Category"
                                    placeholder="Select The Category"
                                    title="Select The Category"
                                    options={categoryOptions?.data}
                                    error={errors.blogCategory?.message}
                                    disabled
                                    readOnly
                                    {...register("blogCategory")}
                                    defaultValue={data?.data?.blogCategory}
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-2 gap-4 md:gap-0">
                                <Select
                                    label="Category"
                                    placeholder="Select The Category"
                                    title="Select The Category"
                                    options={writerBlogOptions}
                                    error={errors.blogStatus?.message}
                                    disabled
                                    readOnly
                                    {...register("blogStatus")}
                                    defaultValue="default"
                                />
                            </div>
                        </div>
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
                            <Link to={"/writer/blogs/blog-list/"}>
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
