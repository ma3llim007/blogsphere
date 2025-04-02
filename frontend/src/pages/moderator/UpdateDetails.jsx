import Input from "@/components/common/Input";
import Loading from "@/components/common/Loading";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UpdateDetails = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
    } = useForm({
        mode: "onChange",
        // resolver: yupResolver(updateWriterSchema),
    });

    // fetching data of moderator
    const { data: responseData, isPending: moderatorIsPending } = useQuery({
        queryKey: ["moderatorAccount"],
        queryFn: () => crudService.get(`moderator/auth/moderator`),
        onError: err => {
            toastService.error(err?.message || "Failed to fetch Data.");
        },
        cacheTime: 2 * 60 * 1000, // 2 minutes
    });

    useEffect(() => {
        const { firstName, lastName, username, email, phoneNumber } = responseData?.data || {};
        setValue("firstName", firstName);
        setValue("lastName", lastName);
        setValue("username", username);
        setValue("email", email);
        setValue("phoneNumber", phoneNumber);
    }, [responseData, setValue]);

    const { mutate, isPending } = useMutation({
        mutationFn: data => crudService.patch("/moderator/auth/update-moderator", data),
        onSuccess: data => {
            navigate("/moderator/account");
            queryClient.invalidateQueries("moderatorAccount");
            toastService.success(data?.message);
        },
        onError: error => {
            const message = error?.response?.data?.message || error?.message;
            setError("root", { message });
        },
    });

    if (isPending || moderatorIsPending) {
        return <Loading />;
    }
    return (
        <>
            <Helmet>
                <title>Update Moderator Details | BlogSphere</title>
                <meta name="description" content="Edit and update your Moderator profile details, manage your account settings, and ensure your information is up to date on BlogSphere." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <PageHeader
                homeUrl="/moderator/dashboard"
                title={"Manage Account"}
                controller={"Dashboard"}
                controllerUrl={"/moderator/dashboard"}
                subController={"Account"}
                subControllerUrl={"/moderator/account"}
                page={"Update Account Details"}
            />
            <section className="w-full">
                <div className="my-4 w-full container mx-auto border-t-4 border-blue-700 rounded-lg p-2 bg-gray-100 dark:bg-slate-800">
                    <form className="space-y-5" onSubmit={handleSubmit(data => mutate(data))}>
                        <h1 className="text-xl font-bold my-4 px-3">Update Moderator Details</h1>
                        {errors.root && (
                            <div className="w-full my-4 bg-red-500 text-center rounded-md border border-red-600 py-3 px-4">
                                <h4 className="text-white font-bold text-sm">{errors.root.message}</h4>
                            </div>
                        )}
                        <div className="flex flex-wrap gap-4 md:gap-0">
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
                        <div className="flex flex-wrap gap-4 md:gap-0">
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
                        <div className="flex flex-wrap gap-4 md:gap-0">
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
                        </div>

                        <div className="w-full border-t !mt-6">
                            <Button disabled={isPending} className="Primary my-2 btnXl cursor-pointer">
                                <FaEdit /> Update
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default UpdateDetails;
