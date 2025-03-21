import Table from "@/admin/components/Table";
import Badge from "@/components/Badge";
import ButtonWithAlert from "@/components/ButtonWithAlert";
import Loading from "@/components/Loaders/Loading";
import { Button } from "@/components/ui/button";
import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { formatDateTime } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const ModeratorList = () => {
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ["ModeratorList"],
        queryFn: () => crudService.get("moderator/moderators", true),
        onError: err => {
            toastService.error(err?.message || "Failed to fetch Data.");
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
            header: "Moderator Verify",
            cell: ({ row }) => (row?.original.moderatorVerify ? <Badge title="Verify" /> : <Badge title="Not Verify" className="Danger" />),
        },
        { accessorKey: "createdAt", header: "Created At", cell: ({ row }) => formatDateTime(row?.original?.createdAt) },
        {
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-1 items-center flex-wrap">
                    <Button className="Primary" onClick={() => navigate(`/admin/moderator/view-moderator/${row.original._id}`)}>
                        View
                    </Button>
                    |
                    <ButtonWithAlert
                        buttonTitle="Delete"
                        dialogTitle="Are You Sure You Want to Delete This Moderator?"
                        dialogDesc="This Action Will Permanently Delete The Moderator. Proceed?"
                        dialogActionTitle="Delete Moderator"
                        // dialogActionfunc={() => deleteBlog(row.original?._id)}
                    />
                </div>
            ),
        },
    ];

    const moderatorData = Array.isArray(data?.data) ? data?.data?.map((moderator, index) => ({ no: index + 1, ...moderator })) : [];
    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <Table data={moderatorData} columns={moderatorColumns} loading={isLoading} paginationOptions={{ pageSize: 10 }} sortable={true} />
        </>
    );
};

export default ModeratorList;
