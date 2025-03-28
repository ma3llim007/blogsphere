import Badge from "@/components/common/Badge";
import ButtonWithAlert from "@/components/common/ButtonWithAlert";
import Loading from "@/components/common/Loading";
import PageHeader from "@/components/common/PageHeader";
import Table from "@/components/common/Table";
import { Button } from "@/components/ui/button";
import crudService from "@/services/crudService";
import queryClient from "@/services/queryClientConfig";
import toastService from "@/services/toastService";
import { statusBlogClass } from "@/utils/statusUtils";
import { formatDateTime } from "@/utils/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const BlogsList = () => {
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ["blogList"],
        queryFn: () => crudService.get("writer/blog/blogs", true),
        onError: err => {
            toastService.error(err?.message || "Failed to fetch Data.");
        },
    });

    // delete Category
    const { mutate: deleteBlog, isPending: deleteIsPending } = useMutation({
        mutationFn: id => crudService.delete(`/writer/blog/delete-blog/${id}`, true),
        onSuccess: data => {
            queryClient.invalidateQueries("blogList");
            toastService.success(data?.message);
        },
        onError: error => {
            const errorMessage = error?.response?.data?.message || error?.message || "An error occurred";
            toastService.error(errorMessage);
        },
    });

    const blogColumns = [
        { accessorKey: "no", header: "No." },
        { accessorKey: "blogTitle", header: "Title" },
        {
            accessorKey: "blogSlug",
            header: "Slug",
            cell: ({ row }) => <div className="w-[150px] break-words text-wrap">{row.getValue("blogSlug")}</div>,
        },
        {
            accessorKey: "blogFeatureImage",
            header: "Feature Image",
            cell: ({ row }) => (
                <div className="w-full flex justify-center">
                    <img src={row.original?.blogFeatureImage} className="min-w-28 max-w-28 min-h-20 max-h-20 object-center rounded-md" alt="Blog Feature Image" />
                </div>
            ),
        },
        { accessorKey: "blogCategory", header: "Category", cell: ({ row }) => row?.original?.blogCategory?.categoryName },
        {
            accessorKey: "blogStatus",
            header: "Order Status",
            cell: ({ row }) => <Badge title={row.original?.blogStatus} className={`${statusBlogClass[row?.original?.blogStatus] || ""} !rounded !leading-normal`} />,
        },
        { header: "Verify By", cell: ({ row }) => `${row?.original?.blogModeratorId?.firstName || "-"} ${row?.original?.blogModeratorId?.lastName || "-"}` },
        {
            accessorKey: "updatedAt",
            header: "Date Time",
            cell: ({ row }) => <p className="text-wrap">{formatDateTime(row.original?.updatedAt)}</p>,
        },
        {
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-1 items-center flex-wrap">
                    <Button className="Info cursor-pointer" onClick={() => navigate(`/writer/blogs/view-blog/${row.original._id}`)}>
                        View
                    </Button>
                    |
                    <ButtonWithAlert
                        buttonTitle="Delete"
                        dialogTitle="Are You Sure You Want to Delete This Blog?"
                        dialogDesc="This Action Will Permanently Delete The Blog. Proceed?"
                        dialogActionTitle="Delete Blog"
                        dialogActionfunc={() => deleteBlog(row.original?._id)}
                    />
                </div>
            ),
        },
    ];

    const blogData = Array.isArray(data?.data) ? data?.data?.map((item, index) => ({ no: index + 1, ...item })) : [];
    if (isLoading || deleteIsPending) return <Loading />;
    return (
        <>
            <Helmet>
                <title>Manage Blog Posts | BlogSphere</title>
                <meta name="description" content="View and manage all blog posts on BlogSphere. Edit, delete, and update content." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <PageHeader homeUrl="writer/dashboard" title={"Manage Blogs"} controller={"Blogs"} controllerUrl={"/writer/blogs/blog-list/"} page={"All Blog's List"} />
            <Table columns={blogColumns} data={blogData} paginationOptions={{ pageSize: 10 }} sortable loading={isLoading} />
        </>
    );
};

export default BlogsList;
