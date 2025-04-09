import ButtonWithAlert from "@/components/common/ButtonWithAlert";
import Loading from "@/components/common/Loading";
import PageHeader from "@/components/common/PageHeader";
import Table from "@/components/common/Table";
import { Button } from "@/components/ui/button";
import crudService from "@/services/crudService";
import queryClient from "@/services/queryClientConfig";
import toastService from "@/services/toastService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const EnquiryListing = () => {
    const navigate = useNavigate();

    // fetching the contact enquiry
    const { data, isPending } = useQuery({
        queryKey: ["contactList"],
        queryFn: () => crudService.get("/admin/enquiry/enquiry-list"),
        onError: err => {
            toastService.error(err?.message || "Failed to fetch Data.");
        },
    });

    // delete Enquiry
    const { mutate: deleteEnquiry, isPending: deleteEnquiryIsPending } = useMutation({
        mutationFn: id => crudService.delete(`contact/delete-contact/${id}`, true),
        onSuccess: data => {
            queryClient.invalidateQueries("contactList");
            toastService.success(data?.message);
        },
        onError: error => {
            const errorMessage = error?.response?.data?.message || error?.message || "An error occurred";
            toastService.error(errorMessage);
        },
    });

    // Contact columns
    const contactColumns = [
        { accessorKey: "no", header: "No." },
        { accessorKey: "name", header: "Full Name" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "phoneNumber", header: "Phone Number" },
        { accessorKey: "subject", header: "Subject" },
        {
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-1 items-center flex-wrap">
                    <Button className="Primary" onClick={() => navigate(`/admin/enquiry/view-enquiry/${row.original._id}`)}>
                        View
                    </Button>
                    |
                    <ButtonWithAlert
                        buttonTitle="Delete"
                        dialogTitle="Are You Sure You Want to Delete This Enquiry?"
                        dialogDesc="This action will permanently delete the Enquiry. Proceed?"
                        dialogActionTitle="Delete Enquiry"
                        dialogActionfn={() => deleteEnquiry(row.original?._id)}
                    />
                </div>
            ),
        },
    ];

    const contactData = Array.isArray(data?.data) ? data.data.map((contact, index) => ({ no: index + 1, ...contact })) : [];

    if (isPending || deleteEnquiryIsPending) return <Loading />;
    return (
        <>
            <Helmet>
                <title>Contact Enquiries | BlogSphere</title>
                <meta name="description" content="View and respond to customer contact enquiries in BlogSphere admin panel." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <PageHeader title={"Manage Enquiry's"} controller={"All Enquiry"} controllerUrl={"/admin/enquiry/contact-list/"} />
            <Table columns={contactColumns} data={contactData} emptyMessage="Contact Is Empty" loading={isPending} paginationOptions={{ pageSize: 10 }} sortable />
        </>
    );
};

export default EnquiryListing;
