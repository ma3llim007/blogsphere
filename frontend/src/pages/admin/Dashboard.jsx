import Loading from "@/components/common/Loading";
import PageHeader from "@/components/common/PageHeader";
import BlogStatusChart from "@/components/writer/dashboard/BlogStatusChart";
import BlogStatusLineChart from "@/components/writer/dashboard/BlogStatusLineChart";
import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaBlogger, FaCheckCircle, FaEdit, FaEnvelopeOpenText, FaFolderOpen, FaTimesCircle, FaUserEdit, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
    // fetching data
    const { data, isPending } = useQuery({
        queryKey: ["dashboard"],
        queryFn: () => crudService.get(`admin/dashboard/analytic`),
        onError: err => {
            toastService.error(err?.message || "Failed to fetch Data.");
        },
    });

    const { cards, categoryChart, blogStatusChart } = data?.data || {};
    const cardData = [
        { count: cards?.totalEnquiries, Icon: FaEnvelopeOpenText, label: "Total Enquiry", color: "text-white", link: "/admin/enquiry/enquiry-list" },
        { count: cards?.totalModerators, Icon: FaUserShield, label: "Total Moderator", color: "text-white", link: "/admin/moderator/moderator-list" },
        { count: cards?.totalWriters, Icon: FaUserEdit, label: "Total Writer", color: "text-white", link: "/admin/writers/writer-list" },
        { count: cards?.totalCategories, Icon: FaFolderOpen, label: "Total Category", color: "text-white", link: "/admin/category/category-list" },
        { count: cards?.totalBlogs, Icon: FaBlogger, label: "Total Blogs", color: "text-white", link: "/admin/blogs/all-blogs" },
        { count: cards?.totalNeedsRevisionBlogs, Icon: FaEdit, label: "Needs Revisions Blogs", color: "text-orange-600", link: "/admin/blogs/revision-blogs" },
        { count: cards?.totalApprovedBlogs, Icon: FaCheckCircle, label: "Approved Blogs", color: "text-green-500", link: "/admin/blogs/approved-blogs" },
        { count: cards?.totalRejectedBlogs, Icon: FaTimesCircle, label: "Rejected Blogs", color: "text-red-500", link: "/admin/blogs/rejected-blogs" },
    ];

    if (isPending) {
        return <Loading />;
    }
    return (
        <>
            <Helmet>
                <title>Admin Dashboard | BlogSphere</title>
                <meta
                    name="description"
                    content="Access the BlogSphere Admin Dashboard to manage blog posts, monitor performance, collaborate with writers, and streamline your publishing workflow."
                />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <PageHeader title={"Dashboard"} controller={"Dashboard"} controllerUrl={"/admin/dashboard/"} />
            <section className="container mx-auto px-4 mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
                    {cardData.map(({ count, Icon, color, label, link }, index) => (
                        <Link key={index} to={link || "#"} className="w-full">
                            <div className="w-full border border-gray-700 dark:border-gray-500/30 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 bg-gray-100 dark:bg-gray-800 hover:shadow-lg hover:shadow-blue-500/40 dark:hover:shadow-blue-400/20 cursor-pointer space-y-4">
                                <div className="flex items-center gap-4 text-3xl font-semibold text-gray-900 dark:text-gray-100">
                                    {Icon && <Icon size={25} className={color} />}
                                    <h4>{count || 0}</h4>
                                </div>
                                <p className="text-lg font-bold text-gray-700 dark:text-gray-300">{label}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <hr className="my-5" />
                <div className="w-full space-y-8">
                    {/* Blog Status Chart */}
                    <div className="border border-gray-700 bg-gray-800 rounded-xl p-6 shadow-lg">
                        <header className="mb-6">
                            <h2 className="text-3xl font-semibold text-white tracking-wide border-b border-gray-600 pb-2">📊 Blog Status Overview</h2>
                        </header>
                        <BlogStatusLineChart data={blogStatusChart} />
                    </div>

                    {/* Blog Category Chart */}
                    <div className="border border-gray-700 bg-gray-800 rounded-xl p-6 shadow-lg">
                        <header className="mb-6">
                            <h2 className="text-3xl font-semibold text-white tracking-wide border-b border-gray-600 pb-2">🗂️ Blog Categories Breakdown</h2>
                        </header>
                        <BlogStatusChart data={categoryChart} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Dashboard;
