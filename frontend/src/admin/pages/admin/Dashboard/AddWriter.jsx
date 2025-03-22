import PageHeader from "@/admin/components/PageHeader";
import Input from "@/components/Form/Input";
import Loading from "@/components/Loaders/Loading";
import { Button } from "@/components/ui/button";
import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { addWriterSchema } from "@/validation/admin/Schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddWriter = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(addWriterSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: data => crudService.post("writer/register-writer", true, data),
        onSuccess: data => {
            navigate("/admin/writers/writer-list");
            queryClient.invalidateQueries("writerList");
            toastService.success(data?.message);
        },
        onError: error => {
            const message = error?.response?.data?.message || error?.message;
            setError("root", { message });
        },
    });

    if (isPending) {
        return <Loading />;
    }
    return (
        <>
            <Helmet>
                <title>Add New Writer | BlogSphere</title>
                <meta name="description" content="Add and manage writers on the BlogSphere admin panel. Assign roles, set permissions, and streamline content creation effortlessly." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <PageHeader title={"Manage Writers"} controller={"Writers"} controllerUrl={"/admin/writers/"} page={"Add Writer's"} />
            <section className="w-full">
                <div className="my-4 w-full container mx-auto border-t-4 border-blue-700 rounded-lg p-2 bg-gray-100 dark:bg-slate-800">
                    <form className="space-y-5" onSubmit={handleSubmit(data => mutate(data))}>
                        <h1 className="text-xl font-bold my-4 px-3">Add New Writer</h1>
                        {errors.root && (
                            <div className="w-full my-4 bg-red-500 text-center rounded-md border border-red-600 py-3 px-4">
                                <h4 className="text-white font-bold text-sm">{errors.root.message}</h4>
                            </div>
                        )}
                        <div className="flex flex-wrap my-2 gap-4 md:gap-0">
                            <div className="w-full md:w-1/2 px-2 gap-4 md:gap-0">
                                <Input
                                    label="First Name"
                                    placeholder="Enter The First Name"
                                    {...register("firstName")}
                                    disabled={isPending}
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    error={errors.firstName?.message}
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-2 gap-4 md:gap-0">
                                <Input
                                    label="Last Name"
                                    placeholder="Enter The Last Name"
                                    {...register("lastName")}
                                    disabled={isPending}
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    error={errors.lastName?.message}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap my-2 gap-4 md:gap-0">
                            <div className="w-full md:w-1/2 px-2 gap-4 md:gap-0">
                                <Input
                                    label="E-Mail"
                                    placeholder="Enter The E-Mail"
                                    {...register("email")}
                                    disabled={isPending}
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    error={errors.email?.message}
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-2 gap-4 md:gap-0">
                                <Input
                                    label="Username"
                                    placeholder="Enter The Username"
                                    {...register("username")}
                                    disabled={isPending}
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    error={errors.username?.message}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap my-2 gap-4 md:gap-0">
                            <div className="w-full md:w-1/2 px-2 gap-4 md:gap-0">
                                <Input
                                    label="Phone Number"
                                    placeholder="Enter The Phone Number"
                                    {...register("phoneNumber")}
                                    disabled={isPending}
                                    minLength={10}
                                    maxLength={15}
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    error={errors.phoneNumber?.message}
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-2 gap-4 md:gap-0">
                                <Input
                                    label="Password"
                                    placeholder="Enter The Password"
                                    {...register("password")}
                                    disabled={isPending}
                                    className="text-xl rounded-sm p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    error={errors.password?.message}
                                />
                            </div>
                        </div>

                        <div className="w-full border-t !mt-6">
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

export default AddWriter;
