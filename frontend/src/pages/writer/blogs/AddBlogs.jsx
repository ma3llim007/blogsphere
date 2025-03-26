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
import { slugTransform } from "@/utils/utils";
import { addBlogScheme } from "@/validation/writerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddBlogs = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        control,
        setError,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(addBlogScheme),
    });

    // Updating the slug value on title change
    useEffect(() => {
        const updateSlug = (name, value) => {
            if (name === "blogTitle") {
                const transformedSlug = slugTransform(value.blogTitle || "");
                setValue("blogSlug", transformedSlug, { shouldValidate: true });
            }
        };

        const subscription = watch((value, { name }) => {
            updateSlug(name, value);
        });

        return () => subscription.unsubscribe();
    }, [watch, setValue]);

    // get the category for options
    const { data: categoryOptions, isLoading } = useQuery({
        queryKey: ["categoryOptions"],
        queryFn: () => crudService.get("/writer/blog/options-category", true),
        onError: err => {
            toastService.error(err?.message || "Failed to fetch Data.");
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: data => crudService.post("/writer/blog/add-blog", true, data, "multipart/form-data"),
        onSuccess: data => {
            navigate("/writer/blogs/blog-list");
            queryClient.invalidateQueries("blogList");
            toastService.success(data?.message);
        },
        onError: error => {
            const message = error?.response?.data?.message || error?.message;
            setError("root", { message });
        },
    });

    if (isPending || isLoading) return <Loading />;
    return (
        <>
            <Helmet>
                <title>Add New Blog | BlogSphere</title>
                <meta name="description" content="Create and publish a new blog post on BlogSphere admin panel. Manage content and SEO settings." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <PageHeader title={"Manage Blogs"} controller={"Blogs"} controllerUrl={"/writer/blogs/add-blog/"} page={"Add Blog's"} />
            <section className="w-full">
                <div className="my-4 w-full container mx-auto border-t-4 border-blue-700 rounded-lg p-2 bg-gray-100 dark:bg-slate-800">
                    <form className="space-y-5" onSubmit={handleSubmit(data => mutate(data))} encType="multipart/form-data">
                        <h1 className="text-xl font-bold my-4 px-2">Add Blog</h1>
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
                                    disabled={isPending}
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
                                    disabled={isPending}
                                    onPaste={e => e.preventDefault()}
                                    onCopy={e => e.preventDefault()}
                                    readOnly
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    error={errors.blogSlug?.message}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 md:gap-0">
                            <div className="w-full md:w-1/2 px-2 gap-4 md:gap-0">
                                <Controller
                                    control={control}
                                    name="blogFeatureImage"
                                    render={({ field }) => (
                                        <Input
                                            label="Blog Feature Image"
                                            title="Select The Blog Feature Image"
                                            additionalTitle="Note:- [For Best View Of Blog Feature Image Width:350px, Height:250px]"
                                            type="file"
                                            disabled={isPending}
                                            accept=".jpg, .jpeg, .png, .gif, .svg, .webp"
                                            onChange={e => field.onChange(e.target.files[0])}
                                            className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            error={errors.blogFeatureImage?.message}
                                        />
                                    )}
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-2 gap-4 md:gap-0">
                                <Select
                                    label="Blog Category"
                                    placeholder="Select The Blog Category"
                                    title="Select The Blog Category"
                                    options={categoryOptions?.data}
                                    error={errors.blogCategory?.message}
                                    disabled={isPending}
                                    {...register("blogCategory")}
                                    defaultValue="default"
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 md:gap-0">
                            <div className="w-full md:w-1/2 px-2 gap-4 md:gap-0">
                                <Select
                                    label="Blog Status"
                                    placeholder="Select The Blog Status"
                                    title="Select The Blog Status"
                                    options={writerBlogOptions}
                                    error={errors.blogStatus?.message}
                                    disabled={isPending}
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
                                disabled={isPending}
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
                                />
                            </Suspense>
                        </div>
                        <div className="w-full border-t !mt-6">
                            <Button disabled={isPending} className="Primary my-2 btnXl cursor-pointer">
                                <FaPlus /> Add
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default AddBlogs;
