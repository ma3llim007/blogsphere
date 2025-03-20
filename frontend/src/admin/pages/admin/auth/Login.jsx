import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { adminLoginSchema } from "@/validation/admin/Schema";

const Login = () => {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        resetField,
    } = useForm({
        resolver: yupResolver(adminLoginSchema),
    });

    return (
        <section className="w-screen h-screen bg-slate-950">
            <div className="container mx-auto flex justify-center items-center h-full">
                <div className="bg-stone-50 rounded-lg shadow-2xl p-8 w-full max-w-md text-black">
                    <h1 className="text-3xl font-bold text-center">Admin Panel</h1>
                    <p className="text-base text-center mb-6 text-gray-600">Sign in to start your session</p>
                    {errors.root && (
                        <div className="w-full my-4 bg-red-500 text-center rounded-md border border-red-600 py-3 px-4">
                            <p className="text-white font-bold text-sm">{errors.root.message}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit()} className="space-y-4">
                        <Input
                            placeholder="Enter The Email"
                            {...register("email")}
                            className="text-xl p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                            error={errors.email?.message}
                        />
                        <Input
                            placeholder="Enter The Password"
                            type="password"
                            {...register("password")}
                            className="text-xl p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                            error={errors.password?.message}
                        />
                        <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
                            <div className="flex gap-2 items-center cursor-pointer">
                                <input type="checkbox" name="remember" id="remember" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 scale-125 cursor-pointer" />
                                <label htmlFor="remember" className="text-xl cursor-pointer">
                                    Remember Me
                                </label>
                            </div>
                            <Button className="Primary" size="lg">
                                Sign In
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
