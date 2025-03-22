import PageHeader from "@/components/common/PageHeader";
import Badge from "@/components/common/Badge";
import ButtonWithAlert from "@/components/common/ButtonWithAlert";
import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import crudService from "@/services/crudService";
import queryClient from "@/services/queryClientConfig";
import toastService from "@/services/toastService";
import { capitalizeWords, formatDateTime } from "@/utils/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaBackward } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const ViewWriter = () => {
    const navigate = useNavigate();
    const { writerId } = useParams();

    // fetching data of order
    const { data: responseData, isPending } = useQuery({
        queryKey: ["viewWriter", writerId],
        queryFn: () => crudService.get(`writer/writer/${writerId}`, true),
        onError: err => {
            toastService.error(err?.message || "Failed to fetch Data.");
        },
        enabled: !!writerId,
        cacheTime: 2 * 60 * 1000, // 2 minutes
    });
    const { data } = responseData || {};

    // Verify The Moderator
    const { mutate, isPending: mutateIsPending } = useMutation({
        mutationFn: () => crudService.patch(`writer/update-writer-status/${writerId}`, true, {}),
        onSuccess: data => {
            navigate("/admin/writers/writer-list");
            queryClient.invalidateQueries("writerList");
            toastService.success(data?.message);
        },
        onError: error => {
            const message = error?.response?.data?.message || error?.message || "An Unexpected Error Occurred";
            toastService.error(message);
        },
    });

    if (isPending || mutateIsPending) return <Loading />;
    return (
        <>
            <Helmet>
                <title>View Writer Details | BlogSphere</title>
                <meta name="description" content="Review Writer details, roles, and permissions in the BlogSphere admin panel." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <PageHeader title={"Manage Writers"} controller={"View All Writers"} controllerUrl={"/admin/writers/writer-list/"} page={"View Writer"} />
            <section className="w-full">
                <div className="my-4 w-full container mx-auto border-t-4 border-blue-700 rounded-lg p-4 bg-gray-100 dark:bg-slate-800 space-y-4">
                    <div className="w-full border bg-gray-700/20 dark:bg-gray-950/50 shadow-md rounded-sm select-none">
                        <table className="table-auto w-full text-lg border-collapse select-none">
                            <tbody className="divide-y">
                                <tr className="hover:bg-gray-300 hover:bg-opacity-60 dark:hover:bg-gray-800 transition">
                                    <th scope="col" colSpan={2} className="text-left p-3 text-2xl font-bold underline">
                                        User Details
                                    </th>
                                </tr>
                                <tr className="hover:bg-gray-300 hover:bg-opacity-60 dark:hover:bg-gray-800 transition">
                                    <th className="text-left p-3 font-semibold">First Name</th>
                                    <td className="p-3 text-left">{capitalizeWords(data?.firstName) || "-"}</td>
                                </tr>
                                <tr className="hover:bg-gray-300 hover:bg-opacity-60 dark:hover:bg-gray-800 transition">
                                    <th className="text-left p-3 font-semibold">Last Name</th>
                                    <td className="p-3 text-left">{capitalizeWords(data?.lastName) || "-"}</td>
                                </tr>
                                <tr className="hover:bg-gray-300 hover:bg-opacity-60 dark:hover:bg-gray-800 transition">
                                    <th className="text-left p-3 font-semibold">Username</th>
                                    <td className="p-3 text-left">{data?.username || "-"}</td>
                                </tr>
                                <tr className="hover:bg-gray-300 hover:bg-opacity-60 dark:hover:bg-gray-800 transition">
                                    <th className="text-left p-3 font-semibold">E-Mail</th>
                                    <td className="p-3 text-left">{data?.email || "-"}</td>
                                </tr>
                                <tr className="hover:bg-gray-300 hover:bg-opacity-60 dark:hover:bg-gray-800 transition">
                                    <th className="text-left p-3 font-semibold">Phone Number</th>
                                    <td className="p-3 text-left">{data?.phoneNumber || "-"}</td>
                                </tr>
                                <tr className="hover:bg-gray-300 hover:bg-opacity-60 dark:hover:bg-gray-800 transition">
                                    <th className="text-left p-3 font-semibold">Phone Number</th>
                                    <td className="p-3 text-left">{data?.writerVerify ? <Badge title="Verify" /> : <Badge title="Not Verify" className="Danger" />}</td>
                                </tr>
                                <tr className="hover:bg-gray-300 hover:bg-opacity-60 dark:hover:bg-gray-800 transition">
                                    <th className="text-left p-3 font-semibold">Create At</th>
                                    <td className="p-3 text-left">{formatDateTime(data?.createdAt)}</td>
                                </tr>
                                {!data?.writerVerify ? (
                                    <tr className="hover:bg-gray-300 hover:bg-opacity-60 dark:hover:bg-gray-800 transition">
                                        <th className="text-left p-3 font-semibold">Verify Writer</th>
                                        <td className="p-3 text-left">
                                            <ButtonWithAlert
                                                buttonTitle="Verify"
                                                dialogTitle="Are You Sure You Want to Verify This Writer?"
                                                dialogDesc="This Action Will Permanently Verify The Writer. Proceed?"
                                                dialogActionTitle="Verify Writer"
                                                buttonColor="Primary"
                                                dialogActionfunc={() => mutate(data?._id)}
                                            />
                                        </td>
                                    </tr>
                                ) : null}
                            </tbody>
                        </table>
                    </div>
                    <Button className="Secondary cursor-pointer" onClick={() => navigate("/admin/writers/writer-list/")}>
                        <FaBackward /> Back To Writer Listing
                    </Button>
                </div>
            </section>
        </>
    );
};

export default ViewWriter;
