import { useQuery } from "@tanstack/react-query";
import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { statusBlogClass } from "@/utils/statusUtils";
import { formatDateTime } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/common/Loading";
import { Helmet } from "react-helmet-async";
import PageHeader from "@/components/common/PageHeader";
import Table from "@/components/common/Table";
import Badge from "@/components/common/Badge";

const ApprovedBlogs = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useQuery({
        queryKey: ["approvedBlogs"],
        queryFn: () => crudService.get("/admin/blog/approved-blogs"),
        onError: err => {
            toastService.error(err?.message || "Failed to fetch Data.");
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
            header: "Blog Status",
            cell: ({ row }) => <Badge title={row.original?.blogStatus} className={`${statusBlogClass[row?.original?.blogStatus] || ""} !rounded !leading-normal`} />,
        },
        { header: "Written By", cell: ({ row }) => `${row?.original?.blogAuthorId?.firstName || "-"} ${row?.original?.blogAuthorId?.lastName || "-"}` },
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
                    <Button className="Info cursor-pointer" onClick={() => navigate(`/admin/blogs/view-blog/${row.original._id}`)}>
                        View
                    </Button>
                </div>
            ),
        },
    ];

    const blogData = Array.isArray(data?.data) ? data?.data?.map((item, index) => ({ no: index + 1, ...item })) : [];
    if (isLoading) return <Loading />;

    return (
        <>
            <Helmet>
                <title>Manage Blog Posts | BlogSphere</title>
                <meta name="description" content="View and manage all blog posts on BlogSphere." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <PageHeader title={"Manage Blogs"} controller={"Blogs"} controllerUrl={"/admin/blogs/revision-blogs/"} page={"Approved List's"} />
            <Table columns={blogColumns} data={blogData} paginationOptions={{ pageSize: 10 }} sortable loading={isLoading} />
        </>
    );
};

export default ApprovedBlogs;
