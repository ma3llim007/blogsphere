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

const ViewModerator = () => {
    const navigate = useNavigate();
    const { moderatorId } = useParams();

    // fetching data of order
    const { data: responseData, isPending } = useQuery({
        queryKey: ["viewModerator", moderatorId],
        queryFn: () => crudService.get(`/admin/moderator/moderator/${moderatorId}`, true),
        onError: err => {
            toastService.error(err?.message || "Failed to fetch Data.");
        },
        enabled: !!moderatorId,
        cacheTime: 2 * 60 * 1000, // 2 minutes
    });
    const { data } = responseData || {};

    // Verify The Moderator
    const { mutate, isPending: mutateIsPending } = useMutation({
        mutationFn: () => crudService.patch(`moderator/update-moderator-status/${moderatorId}`, true, {}),
        onSuccess: data => {
            navigate("/admin/moderator/moderator-list");
            queryClient.invalidateQueries("ModeratorList");
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
                <title>View Moderator Details | BlogSphere</title>
                <meta name="description" content="Review moderator details, roles, and permissions in the BlogSphere admin panel." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <PageHeader title={"Manage Moderators"} controller={"View All Moderator"} controllerUrl={"/admin/moderator/moderator-list/"} page={"View Moderator"} />
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
                                    <td className="p-3 text-left">{data?.moderatorVerify ? <Badge title="Verify" /> : <Badge title="Not Verify" className="Danger" />}</td>
                                </tr>
                                <tr className="hover:bg-gray-300 hover:bg-opacity-60 dark:hover:bg-gray-800 transition">
                                    <th className="text-left p-3 font-semibold">Create At</th>
                                    <td className="p-3 text-left">{formatDateTime(data?.createdAt)}</td>
                                </tr>
                                {!data?.moderatorVerify ? (
                                    <tr className="hover:bg-gray-300 hover:bg-opacity-60 dark:hover:bg-gray-800 transition">
                                        <th className="text-left p-3 font-semibold">Verify Moderator</th>
                                        <td className="p-3 text-left">
                                            <ButtonWithAlert
                                                buttonTitle="Verify"
                                                dialogTitle="Are You Sure You Want to Verify This Moderator?"
                                                dialogDesc="This Action Will Permanently Verify The Moderator. Proceed?"
                                                dialogActionTitle="Verify Moderator"
                                                buttonColor="Primary"
                                                dialogActionfunc={() => mutate(data?._id)}
                                            />
                                        </td>
                                    </tr>
                                ) : null}
                            </tbody>
                        </table>
                    </div>
                    <Button className="Primary cursor-pointer" onClick={() => navigate("/admin/moderator/moderator-list/")}>
                        <FaBackward /> Back To Moderator Listing
                    </Button>
                </div>
            </section>
        </>
    );
};

export default ViewModerator;
