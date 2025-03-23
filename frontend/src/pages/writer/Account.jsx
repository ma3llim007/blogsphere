import Badge from "@/components/common/Badge";
import Loading from "@/components/common/Loading";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { capitalizeWords, formatDateTime } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Account = () => {
    // fetching data of writer
    const { data: responseData, isPending } = useQuery({
        queryKey: ["writerAccount"],
        queryFn: () => crudService.get(`writer/auth/writer`, true),
        onError: err => {
            toastService.error(err?.message || "Failed to fetch Data.");
        },
        cacheTime: 2 * 60 * 1000, // 2 minutes
    });

    const { data } = responseData || {};
    if (isPending) return <Loading />;
    return (
        <>
            <Helmet>
                <title>My Account | BlogSphere</title>
                <meta name="description" content="Manage your account settings, update profile details, and review your activity in BlogSphere." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <PageHeader homeUrl="/writer/dashboard" title={"Manage Account"} controller={"Dashboard"} controllerUrl={"/writer/dashboard"} page={"View Account"} />
            <section className="w-full">
                <div className="my-4 w-full container mx-auto border-t-4 border-blue-700 rounded-lg p-4 bg-gray-100 dark:bg-slate-800 space-y-4">
                    <div className="w-full border bg-gray-700/20 dark:bg-gray-950/50 shadow-md rounded-sm select-none overflow-x-auto">
                        <table className="table-auto w-full text-lg border-collapse select-none min-w-[600px]">
                            <tbody className="divide-y">
                                <tr className="hover:bg-gray-300 hover:bg-opacity-60 dark:hover:bg-gray-800 transition">
                                    <th scope="col" className="text-left p-3 text-xl md:text-2xl font-bold underline">
                                        User Details
                                    </th>
                                    <td className="p-3 text-right text-sm md:text-base">
                                        <Link to="/writer/update-writer-details">
                                            <Button className="Info cursor-pointer">
                                                <FaEdit /> Update Details
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-300 hover:bg-opacity-60 dark:hover:bg-gray-800 transition">
                                    <th className="text-left p-3 font-semibold text-sm md:text-base">First Name</th>
                                    <td className="p-3 text-left text-sm md:text-base">{capitalizeWords(data?.firstName) || "-"}</td>
                                </tr>
                                <tr className="hover:bg-gray-300 hover:bg-opacity-60 dark:hover:bg-gray-800 transition">
                                    <th className="text-left p-3 font-semibold text-sm md:text-base">Last Name</th>
                                    <td className="p-3 text-left text-sm md:text-base">{capitalizeWords(data?.lastName) || "-"}</td>
                                </tr>
                                <tr className="hover:bg-gray-300 hover:bg-opacity-60 dark:hover:bg-gray-800 transition">
                                    <th className="text-left p-3 font-semibold text-sm md:text-base">Username</th>
                                    <td className="p-3 text-left text-sm md:text-base">{data?.username || "-"}</td>
                                </tr>
                                <tr className="hover:bg-gray-300 hover:bg-opacity-60 dark:hover:bg-gray-800 transition">
                                    <th className="text-left p-3 font-semibold text-sm md:text-base">E-Mail</th>
                                    <td className="p-3 text-left text-sm md:text-base">{data?.email || "-"}</td>
                                </tr>
                                <tr className="hover:bg-gray-300 hover:bg-opacity-60 dark:hover:bg-gray-800 transition">
                                    <th className="text-left p-3 font-semibold text-sm md:text-base">Phone Number</th>
                                    <td className="p-3 text-left text-sm md:text-base">{data?.phoneNumber || "-"}</td>
                                </tr>
                                <tr className="hover:bg-gray-300 hover:bg-opacity-60 dark:hover:bg-gray-800 transition">
                                    <th className="text-left p-3 font-semibold text-sm md:text-base">Created At</th>
                                    <td className="p-3 text-left text-sm md:text-base">{formatDateTime(data?.createdAt)}</td>
                                </tr>
                                <tr className="hover:bg-gray-300 hover:bg-opacity-60 dark:hover:bg-gray-800 transition">
                                    <th className="text-left p-3 font-semibold text-sm md:text-base">Verify By Admin</th>
                                    <td className="p-3 text-left text-sm md:text-base">
                                        <Badge title="Verify" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Account;
