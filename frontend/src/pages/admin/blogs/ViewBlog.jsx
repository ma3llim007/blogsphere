import Input from "@/components/common/Input";
import Loading from "@/components/common/Loading";
import PageHeader from "@/components/common/PageHeader";
import RichTextEditor from "@/components/common/RichTextEditor";
import TextArea from "@/components/common/TextArea";
import { Button } from "@/components/ui/button";
import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { capitalizeWords } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaBackward } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const ViewBlog = () => {
    const { blogId } = useParams();
    const { control } = useForm();

    const { data, isLoading } = useQuery({
        queryKey: ["blog", blogId],
        queryFn: () => crudService.get(`/admin/blog/blog-details/${blogId}`),
        onError: err => {
            toastService.error(err?.message || "Failed to fetch Data.");
        },
    });
    const blogData = data?.data || {};

    if (isLoading) return <Loading />;
    return (
        <>
            <Helmet>
                <title>View Blog Post | BlogSphere</title>
                <meta name="description" content="Viewing an existing blog post in BlogSphere admin panel." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <PageHeader title={"Manage Blogs"} controller={"Blog Listing"} controllerUrl={"/admin/blogs/all-blogs/"} page={"View Blog"} />
            <section className="w-full">
                <div className="my-4 w-full container mx-auto border-t-4 border-blue-700 rounded-lg p-2 bg-gray-100 dark:bg-slate-800">
                    <form className="space-y-5">
                        <h1 className="text-xl font-bold my-4 px-2">View Blog</h1>
                        <div className="flex flex-wrap gap-4 md:gap-0">
                            <div className="w-full px-2">
                                <Input
                                    label="Blog Title"
                                    placeholder="Enter The Blog Title"
                                    disabled
                                    readOnly
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    value={blogData?.blogTitle}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 md:gap-0">
                            <div className="w-full px-2">
                                <Input
                                    label="Blog Slug"
                                    placeholder="View The Blog Slug"
                                    disabled
                                    readOnly
                                    onPaste={e => e.preventDefault()}
                                    onCopy={e => e.preventDefault()}
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    value={blogData?.blogSlug}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 md:gap-0">
                            <div className="w-full md:w-1/2 px-2 gap-4 md:gap-0">
                                <Input
                                    label="Blog Status"
                                    placeholder="View The Blog Status"
                                    disabled
                                    readOnly
                                    onPaste={e => e.preventDefault()}
                                    onCopy={e => e.preventDefault()}
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    value={capitalizeWords(blogData?.blogStatus)}
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-2 gap-4 md:gap-0">
                                <div className="w-full">
                                    <label className="inline-block mb-2 pl-1 text-base font-bold">Blog Feature Image</label>
                                    <img src={blogData?.blogFeatureImage} className="max-w-60 max-h-60 object-cover rounded" alt="Blog Feature Image" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 md:gap-0">
                            <div className="w-full md:w-1/2 px-2 gap-4 md:gap-0">
                                <Input
                                    label="Category"
                                    placeholder="View The Category"
                                    disabled
                                    readOnly
                                    onPaste={e => e.preventDefault()}
                                    onCopy={e => e.preventDefault()}
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    value={capitalizeWords(blogData?.blogCategory?.categoryName)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 md:gap-0">
                            <div className="w-full md:w-1/2 px-2 gap-4 md:gap-0">
                                <Input
                                    label="Written By"
                                    placeholder="View The Written By"
                                    disabled
                                    readOnly
                                    onPaste={e => e.preventDefault()}
                                    onCopy={e => e.preventDefault()}
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    value={capitalizeWords(`${blogData?.blogAuthorId?.firstName} ${blogData?.blogAuthorId?.lastName}`)}
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-2 gap-4 md:gap-0">
                                <Input
                                    label="Verify By"
                                    placeholder="View The Verify By"
                                    disabled
                                    readOnly
                                    onPaste={e => e.preventDefault()}
                                    onCopy={e => e.preventDefault()}
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    value={capitalizeWords(`${blogData?.blogModeratorId?.firstName} ${blogData?.blogModeratorId?.lastName}`)}
                                />
                            </div>
                        </div>
                        {blogData?.blogStatus === "Needs Revisions" ? (
                            <div className="w-full px-2">
                                <TextArea
                                    name="Needs Revisions"
                                    label="Needs Revisions"
                                    placeholder="View Needs Revisions"
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
                                    rows={5}
                                    value={blogData?.blogRevisionMessage || ""}
                                    readOnly
                                    disabled
                                />
                            </div>
                        ) : null}
                        {blogData?.blogStatus === "Rejected" ? (
                            <div className="w-full px-2">
                                <TextArea
                                    name="Needs Revisions"
                                    label="Needs Revisions"
                                    placeholder="View Needs Revisions"
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
                                    rows={5}
                                    value={blogData?.blogRejectedMessage || ""}
                                />
                            </div>
                        ) : null}
                        <div className="w-full px-2">
                            <TextArea
                                name="blogShortDescription"
                                label="Blog Short Description"
                                placeholder="Enter The Blog Short Description"
                                className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
                                rows={2}
                                disabled
                                readOnly
                                value={blogData?.blogShortDescription}
                            />
                        </div>
                        <div className="w-full px-2">
                            <Suspense fallback={<Loading />}>
                                <RichTextEditor
                                    control={control}
                                    name="blogDescription"
                                    label="Blog Description"
                                    placeholder="Enter The Product Description"
                                    className="text-xl rounded-sm focus:ring-2 focus:ring-blue-800"
                                    disabled
                                    readOnly
                                    value={blogData?.blogDescription}
                                />
                            </Suspense>
                        </div>
                        {/*
                       
                        
                       
                         */}
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
