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

const WriterList = () => {
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ["writerList"],
        queryFn: () => crudService.get("/admin/writer/writers"),
        onError: err => {
            toastService.error(err?.message || "Failed to fetch Data.");
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: id => crudService.delete(`/admin/writer/delete-writer/${id}`),
        onSuccess: data => {
            queryClient.invalidateQueries("writerList");
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
            accessorKey: "writerVerify",
            header: "Verify",
            cell: ({ row }) => (row?.original.writerVerify ? <Badge title="Verify" /> : <Badge title="Not Verify" className="Danger" />),
        },
        { accessorKey: "createdAt", header: "Created At", cell: ({ row }) => formatDateTime(row?.original?.createdAt) },
        {
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-1 items-center flex-wrap">
                    <Button className="Primary cursor-pointer" onClick={() => navigate(`/admin/writers/view-writer/${row.original._id}`)}>
                        View
                    </Button>
                    |
                    <ButtonWithAlert
                        buttonTitle="Delete"
                        dialogTitle="Are You Sure You Want to Delete This Writer?"
                        dialogDesc="This Action Will Permanently Delete The Writer. Proceed?"
                        dialogActionTitle="Delete Writer"
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
                <title>Writer List | Admin Panel | BlogSphere</title>
                <meta name="description" content="Manage all registered writers on BlogSphere. View activity, update roles, or remove writers as needed." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <PageHeader title={"Manage Writers"} controller={"View All Writers"} controllerUrl={"/admin/writers/writer-list/"} page={"Writer Listing"} />
            <Table data={moderatorData} columns={moderatorColumns} loading={isLoading} paginationOptions={{ pageSize: 10 }} sortable={true} />
        </>
    );
};

export default WriterList;
