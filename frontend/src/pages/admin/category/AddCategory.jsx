import PageHeader from "@/components/common/PageHeader";
import Input from "@/components/common/Input";
import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { slugTransform } from "@/utils/utils";
import { addCategoryScheme } from "@/validation/adminSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
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
        resolver: yupResolver(addCategoryScheme),
        mode: "onChange",
    });

    const { mutate, isPending } = useMutation({
        mutationFn: data => crudService.post("/admin/category/add-category", data, "multipart/form-data"),
        onSuccess: data => {
            navigate("/admin/category/category-list");
            queryClient.invalidateQueries("categoryList");
            toastService.success(data?.message);
        },
        onError: error => {
            const message = error?.response?.data?.message || error?.message;
            setError("root", { message });
        },
    });

    // Updating the slug value on title change
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

    if (isPending) {
        return <Loading />;
    }
    return (
        <>
            <Helmet>
                <title>Add Category | Admin Panel | BlogSphere</title>
                <meta name="description" content="Create a new blog category in BlogSphere. Organize content effectively by assigning categories to blog posts." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <PageHeader title={"Manage Category's"} controller={"Category"} controllerUrl={"/admin/category/add-category/"} page={"Add Category's"} />
            <section className="w-full">
                <div className="my-4 w-full container mx-auto border-t-4 border-blue-700 rounded-lg p-2 bg-gray-100 dark:bg-slate-800">
                    <form className="space-y-5" onSubmit={handleSubmit(data => mutate(data))} encType="multipart/form-data">
                        <h1 className="text-xl font-bold my-4 px-2">Add Category</h1>
                        {errors.root && (
                            <div className="w-full my-4 bg-red-500 text-center rounded-md border border-red-600 py-3 px-4">
                                <h4 className="text-white font-bold text-sm">{errors.root.message}</h4>
                            </div>
                        )}
                        <div className="flex flex-wrap gap-4 md:gap-0">
                            <div className="w-full px-2">
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
                        <div className="flex flex-wrap gap-4 md:gap-0">
                            <div className="w-full md:w-1/2 px-2">
                                <Input
                                    label="Category Slug"
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
                            <div className="w-full md:w-1/2 px-2 gap-4 md:gap-0">
                                <Controller
                                    control={control}
                                    name="categoryImage"
                                    render={({ field }) => (
                                        <Input
                                            label="Category Image"
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
                        </div>
                        <div className="w-full border-t">
                            <Button disabled={isPending} className="Primary my-2 btnXl cursor-pointer">
                                {isPending ? (
                                    <Loading height="7" weight="7" />
                                ) : (
                                    <>
                                        <FaPlus /> Add
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default AddCategory;
