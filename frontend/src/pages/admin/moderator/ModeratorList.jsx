import PageHeader from "@/components/common/PageHeader";
import Table from "@/components/common/Table";
import Badge from "@/components/common/Badge";
import ButtonWithAlert from "@/components/common/ButtonWithAlert";
import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import crudService from "@/services/crudService";
import queryClient from "@/services/queryClientConfig";
import toastService from "@/services/toastService";
import { formatDateTime } from "@/utils/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const ModeratorList = () => {
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ["moderatorList"],
        queryFn: () => crudService.get("/admin/moderator/moderators", true),
        onError: err => {
            toastService.error(err?.message || "Failed to fetch Data.");
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: id => crudService.delete(`/admin/moderator/delete-moderator/${id}`, true),
        onSuccess: data => {
            queryClient.invalidateQueries("moderatorList");
            toastService.success(data?.message);
        },
        onError: error => {
            const errorMessage = error?.response?.data?.message || error?.message || "An error occurred";
            toastService.error(errorMessage);
        },
    });
    const moderatorColumns = [
        { accessorKey: "no", header: "No." },
        { accessorKey: "firstName", header: "First Name" },
        { accessorKey: "lastName", header: "Last Name" },
        { accessorKey: "username", header: "Username" },
        { accessorKey: "email", header: "EMail" },
        { accessorKey: "phoneNumber", header: "Phone Number" },
        {
            accessorKey: "moderatorVerify",
            header: "Verify",
            cell: ({ row }) => (row?.original.moderatorVerify ? <Badge title="Verify" /> : <Badge title="Not Verify" className="Danger" />),
        },
        { accessorKey: "createdAt", header: "Created At", cell: ({ row }) => formatDateTime(row?.original?.createdAt) },
        {
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-1 items-center flex-wrap">
                    <Button className="Primary cursor-pointer" onClick={() => navigate(`/admin/moderator/view-moderator/${row.original._id}`)}>
                        View
                    </Button>
                    |
                    <ButtonWithAlert
                        buttonTitle="Delete"
                        dialogTitle="Are You Sure You Want to Delete This Moderator?"
                        dialogDesc="This Action Will Permanently Delete The Moderator. Proceed?"
                        dialogActionTitle="Delete Moderator"
                        dialogActionfunc={() => mutate(row.original?._id)}
                    />
                </div>
            ),
        },
    ];

    const moderatorData = Array.isArray(data?.data) ? data?.data?.map((moderator, index) => ({ no: index + 1, ...moderator })) : [];
    if (isLoading || isPending) {
        return <Loading />;
    }

    return (
        <>
            <Helmet>
                <title>Moderator Listing | BlogSphere</title>
                <meta name="description" content="View and manage all moderators in the BlogSphere admin panel. Assign roles, update permissions, and monitor activity efficiently." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <PageHeader title={"Manage Moderators"} controller={"View All Moderator"} controllerUrl={"/admin/moderator/moderator-list/"} page={"Moderator Listing"} />
            <Table data={moderatorData} columns={moderatorColumns} loading={isLoading} paginationOptions={{ pageSize: 10 }} sortable={true} />
        </>
    );
};

export default ModeratorList;
