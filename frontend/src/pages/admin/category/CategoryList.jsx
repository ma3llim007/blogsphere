import PageHeader from "@/components/common/PageHeader";
import Table from "@/components/common/Table";
import ButtonWithAlert from "@/components/common/ButtonWithAlert";
import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { formatDateTime } from "@/utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // fetching category
    const { data, isLoading } = useQuery({
        queryKey: ["categoryList"],
        queryFn: () => crudService.get("/admin/category/categories"),
        onError: err => {
            toastService.error(err?.message || "Failed to fetch Data.");
        },
    });

    // delete Category
    const { mutate: deleteCategory, isPending } = useMutation({
        mutationFn: id => crudService.delete(`/admin/category/delete-category/${id}`),
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
                    <Button className="Primary cursor-pointer" onClick={() => navigate(`/admin/category/edit-category/${row.original._id}`)}>
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
                <title>Category List | Admin Panel | BlogSphere</title>
                <meta name="description" content="Browse all blog categories in BlogSphere. Manage, edit, or delete categories to maintain structured content." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <PageHeader title={"Manage Category's"} controller={"Category"} controllerUrl={"/admin/category/category-list/"} page={"Category's List"} />
            <Table columns={categoryColumns} data={categoryData} paginationOptions={{ pageSize: 10 }} sortable loading={isLoading} />
        </>
    );
};

export default CategoryList;
