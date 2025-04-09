import Badge from "@/components/common/Badge";
import Loading from "@/components/common/Loading";
import PageHeader from "@/components/common/PageHeader";
import Table from "@/components/common/Table";
import { Button } from "@/components/ui/button";
import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { statusBlogClass } from "@/utils/statusUtils";
import { formatDateTime } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const ApprovedBlogs = () => {
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ["approvedBlogs"],
        queryFn: () => crudService.get("moderator/blog/approved-blogs"),
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
        {
            accessorKey: "updatedAt",
            header: "Date Time",
            cell: ({ row }) => <p className="text-wrap">{formatDateTime(row.original?.updatedAt)}</p>,
        },
        {
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-1 items-center flex-wrap">
                    <Button className="Info cursor-pointer" onClick={() => navigate(`/moderator/blogs/view-blog/${row.original._id}`)}>
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
                <title>Approved Blogs | Moderator Panel | BlogSphere</title>
                <meta name="description" content="Browse all blogs approved by you or the moderation team in BlogSphere. Ensure quality and publishing standards are met." />
                <meta name="keywords" content="Approved Blogs, Moderator Blogs, Blog Approval, Blog Review, BlogSphere Moderator, Published Blogs" />
                <meta name="robots" content="noindex, nofollow" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Helmet>
            <PageHeader homeUrl="/moderator/dashboard" title={"Manage Blogs"} controller={"Blogs"} controllerUrl={"/moderator/blogs/approved-blogs/"} page={"Approved Blog's List"} />
            <Table columns={blogColumns} data={blogData} paginationOptions={{ pageSize: 10 }} sortable loading={isLoading} />
        </>
    );
};

export default ApprovedBlogs;
