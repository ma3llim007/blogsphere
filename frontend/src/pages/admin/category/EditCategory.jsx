import PageHeader from "@/components/common/PageHeader";
import Input from "@/components/common/Input";
import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { slugTransform } from "@/utils/utils";
import { editCategorySchema } from "@/validation/adminSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import { FaBackward, FaEdit } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
        control,
        setValue,
        setError,
    } = useForm({
        resolver: yupResolver(editCategorySchema),
        mode: "onChange",
        defaultValues: {
            categoryName: "",
            categorySlug: "",
            categoryImage: "",
        },
    });
    const { categoryId } = useParams();

    // Fetch category data based on categoryId
    const { data: categoryData, isSuccess } = useQuery({
        queryKey: ["category", categoryId],
        queryFn: () => crudService.get(`/admin/category/get-category/${categoryId}`),
        enabled: !!categoryId,
        onError: err => {
            toastService.error(err?.message || "Failed to fetch Data.");
        },
    });

    useEffect(() => {
        if (isSuccess && categoryData?.data) {
            const { categoryName, categorySlug } = categoryData?.data || {};
            setValue("categoryName", categoryName);
            setValue("categorySlug", categorySlug);
        }
    }, [isSuccess, categoryData, setValue]);

    // update the data
    const { mutate, isPending } = useMutation({
        mutationFn: data => {
            const formData = new FormData();
            formData.append("categoryName", data?.categoryName);
            formData.append("categorySlug", data?.categorySlug);
            if (data?.categoryImage) {
                formData.append("categoryImage", data?.categoryImage);
            }
            formData.append("categoryId", categoryId);
            return crudService.patch("/admin/category/update-category", formData, "multipart/form-data");
        },
        onSuccess: data => {
            navigate("/admin/category/category-list");
            queryClient.invalidateQueries("categoryList");
            queryClient.removeQueries(["category", categoryId]);
            toastService.success(data?.message);
        },
        onError: error => {
            const message = error?.response?.data?.message || error?.message;
            setError("root", { message });
        },
    });

    // Automatically update slug when category name changes
    useEffect(() => {
        const updateSlug = (name, value) => {
            if (name === "categoryName") {
                const transformedSlug = slugTransform(value.categoryName || "");
                setValue("categorySlug", transformedSlug, {
                    shouldValidate: true,
                });
            }
        };

        const subscription = watch((value, { name }) => {
            updateSlug(name, value);
        });
        return () => subscription.unsubscribe();
    }, [watch, setValue]);

    if (isPending) return <Loading />;
    return (
        <>
            <Helmet>
                <title>Edit Category | Admin Panel | BlogSphere</title>
                <meta name="description" content="Update or rename an existing blog category in the BlogSphere admin dashboard. Maintain consistent content organization." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <PageHeader title={"Manage Category's"} controller={"Category"} controllerUrl={"/admin/category/category-list"} page={"Edit Category"} />
            <section className="w-full">
                <div className="my-4 w-full container mx-auto border-t-4 border-blue-700 rounded-lg p-2 bg-gray-100 dark:bg-slate-800">
                    <form className="space-y-5" onSubmit={handleSubmit(data => mutate(data))} encType="multipart/form-data">
                        <h1 className="text-xl font-bold my-4 px-2">Edit Category</h1>
                        {errors.root && (
                            <div className="w-full my-4 bg-red-500 text-center rounded-md border border-red-600 py-3 px-4">
                                <h4 className="text-white font-bold text-sm">{errors.root.message}</h4>
                            </div>
                        )}
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-1/2 px-2 flex-grow">
                                <Input
                                    label="Category Name"
                                    placeholder="Enter The Category Name"
                                    {...register("categoryName")}
                                    disabled={isPending}
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    error={errors.categoryName?.message}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-1/2 px-2 flex-grow">
                                <Input
                                    label="Slug"
                                    placeholder="View The Category Slug"
                                    {...register("categorySlug")}
                                    disabled={isPending}
                                    onPaste={e => e.preventDefault()}
                                    onCopy={e => e.preventDefault()}
                                    readOnly
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    error={errors.categorySlug?.message}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-1/2 px-2">
                                <Controller
                                    control={control}
                                    name="categoryImage"
                                    render={({ field }) => (
                                        <Input
                                            label="Select The Category Image"
                                            title="Select The Category Image"
                                            additionalTitle="Note:- [For Best View Of Category Image Width:350px, Height:250px]"
                                            type="file"
                                            disabled={isPending}
                                            accept=".jpg, .jpeg, .png, .gif, .svg, .webp"
                                            onChange={e => field.onChange(e.target.files[0])}
                                            className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            error={errors.categoryImage?.message}
                                        />
                                    )}
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-2">
                                <div className="w-full">
                                    <label className="inline-block mb-2 pl-1 text-base font-bold">Previous Image</label>
                                    <img src={categoryData?.data?.categoryImage} className="max-w-60 max-h-60 object-cover rounded" alt="Previous Category" />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="w-full flex gap-2 my-2 items-center">
                            <Button disabled={isPending} className="Success cursor-pointer">
                                {isPending ? (
                                    <Loading height="7" weight="7" />
                                ) : (
                                    <>
                                        <FaEdit /> Update
                                    </>
                                )}
                            </Button>
                            |
                            <Link to={"/admin/category/category-list"}>
                                <Button type="button" className="Secondary cursor-pointer">
                                    <FaBackward /> Back To Category Listing
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default EditCategory;
