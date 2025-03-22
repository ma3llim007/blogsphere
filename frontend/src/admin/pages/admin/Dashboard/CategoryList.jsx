import PageHeader from "@/admin/components/PageHeader";
import Table from "@/admin/components/Table";
import Badge from "@/components/Badge";
import ButtonWithAlert from "@/components/ButtonWithAlert";
import Loading from "@/components/Loaders/Loading";
import { Button } from "@/components/ui/button";
import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { formatDateTime } from "@/utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // fetching category
    const { data, isLoading } = useQuery({
        queryKey: ["categoryList"],
        queryFn: () => crudService.get("category/categories", true),
        onError: err => {
            toastService.error(err?.message || "Failed to fetch Data.");
        },
    });

    // delete Category
    const { mutate: deleteCategory, isPending } = useMutation({
        mutationFn: id => crudService.delete(`category/delete-category/${id}`, true),
        onSuccess: data => {
            queryClient.invalidateQueries("categoryList");
            toastService.success(data?.message);
        },
        onError: error => {
            const errorMessage = error?.response?.data?.message || error?.message || "An error occurred";
            toastService.error(errorMessage);
        },
    });

    // category columns
    const categoryColumns = [
        { accessorKey: "no", header: "No." },
        {
            accessorKey: "categoryName",
            header: "Category Name",
        },
        { accessorKey: "categorySlug", header: "Category Slug" },
        {
            accessorKey: "categoryImage",
            header: "Category Image",
            cell: ({ row }) => (
                <div className="w-full flex justify-center">
                    <img src={row.original?.categoryImage} className="min-w-28 max-w-28 min-h-20 max-h-20 object-center rounded-md" alt="Category Image" />
                </div>
            ),
        },
        {
            accessorKey: "updatedAt",
            header: "Date Time",
            cell: ({ row }) => <p className="text-wrap">{formatDateTime(row.original?.updatedAt)}</p>,
        },
        {
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-1 items-center flex-wrap">
                    <Button className="Primary" onClick={() => navigate(`/admin/category/edit-category/${row.original._id}`)}>
                        Edit
                    </Button>
                    |
                    <ButtonWithAlert
                        buttonTitle="Delete"
                        dialogTitle="Are You Sure You Want to Delete This Category?"
                        dialogDesc="This action will permanently delete the category. Proceed?"
                        dialogActionTitle="Delete Category"
                        dialogActionfunc={() => deleteCategory(row.original?._id)}
                    />
                </div>
            ),
        },
    ];
    const categoryData = data?.data?.map((data, index) => ({ no: index + 1, ...data })) || [];

    if (isLoading || isPending) return <Loading />;
    return (
        <>
            <Helmet>
                <title>Manage Categories | BlogSphere</title>
                <meta name="description" content="View and manage product categories in BlogSphere admin panel. Add, edit, and delete categories easily." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <PageHeader title={"Manage Category"} controller={"Category"} controllerUrl={"/admin/category/category-list/"} page={"Category's List"} />
            <Table columns={categoryColumns} data={categoryData} paginationOptions={{ pageSize: 10 }} sortable loading={isLoading} />
        </>
    );
};

export default CategoryList;
