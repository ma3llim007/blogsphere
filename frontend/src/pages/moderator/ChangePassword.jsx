import Input from "@/components/common/Input";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import crudService from "@/services/crudService";
import queryClient from "@/services/queryClientConfig";
import toastService from "@/services/toastService";
import { logoutWriter } from "@/store/features/writer/writerAuthSlice";
import { moderatorChangePasswordSchema } from "@/validation/moderatorScheme";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(moderatorChangePasswordSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: data => crudService.patch("/moderator/auth/change-password", true, data),
        onSuccess: data => {
            dispatch(logoutWriter());
            queryClient.clear();
            navigate("/moderator/account");
            toastService.success(data?.message);
        },
        onError: error => {
            const message = error?.response?.data?.message || error?.message;
            setError("root", { message });
        },
    });
    return (
        <>
            <Helmet>
                <title>Change Password | BlogSphere</title>
                <meta name="description" content="Secure your BlogSphere account by updating your password. Change your password regularly to keep your account safe." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <PageHeader
                homeUrl="/moderator/dashboard"
                title={"Manage Account"}
                controller={"Dashboard"}
                controllerUrl={"/moderator/dashboard"}
                subController={"Account"}
                subControllerUrl={"/moderator/account"}
                page={"Change Password"}
            />
            <section className="w-full">
                <div className="my-4 w-full container mx-auto border-t-4 border-blue-700 rounded-lg p-2 bg-gray-100 dark:bg-slate-800">
                    <form className="space-y-5" onSubmit={handleSubmit(data => mutate(data))}>
                        <h1 className="text-xl font-bold my-4 px-3">Change Password</h1>
                        {errors.root && (
                            <div className="w-full my-4 bg-red-500 text-center rounded-md border border-red-600 py-3 px-4">
                                <h4 className="text-white font-bold text-sm">{errors.root.message}</h4>
                            </div>
                        )}
                        <div className="flex flex-wrap my-2 gap-4 md:gap-0">
                            <div className="w-full px-2 gap-4 md:gap-0">
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
                                <FaEdit /> Change Password
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default ChangePassword;
