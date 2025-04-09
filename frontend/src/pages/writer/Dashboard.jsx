import Loading from "@/components/common/Loading";
import PageHeader from "@/components/common/PageHeader";
import BlogStatusLineChart from "@/components/writer/dashboard/BlogStatusLineChart";
import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaBlogger, FaCheckCircle, FaClipboardList, FaEdit, FaFileAlt, FaTimesCircle } from "react-icons/fa";
import BlogStatusChart from "@/components/writer/dashboard/BlogStatusChart";
import { Link } from "react-router-dom";

const Dashboard = () => {
    // fetching data of writer
    const { data, isPending } = useQuery({
        queryKey: ["dashboard"],
        queryFn: () => crudService.get(`writer/dashboard/analytic`),
        onError: err => {
            toastService.error(err?.message || "Failed to fetch Data.");
        },
    });

    const { cards, blogStatusChart, categoryChart } = data?.data || {};

    const cardData = [
        { count: cards?.totalBlogs, Icon: FaBlogger, label: "Total Blogs", color: "text-white", link: "/writer/blogs/blog-list" },
        { count: cards?.totalDraftBlogs, Icon: FaFileAlt, label: "Draft Blogs", color: "text-gray-100", link: "/writer/blogs/draft-blogs" },
        { count: cards?.totalReadyToPublishBlogs, Icon: FaClipboardList, label: "Ready To Publish Blogs", color: "text-blue-500", link: "/writer/blogs/pending-blogs" },
        { count: cards?.totalNeedsRevisionBlogs, Icon: FaEdit, label: "Needs Revisions Blogs", color: "text-orange-600", link: "/writer/blogs/revision-blogs" },
        { count: cards?.totalApprovedBlogs, Icon: FaCheckCircle, label: "Approved Blogs", color: "text-green-500", link: "/writer/blogs/approved-blogs" },
        { count: cards?.totalRejectedBlogs, Icon: FaTimesCircle, label: "Rejected Blogs", color: "text-red-500", link: "/writer/blogs/rejected-blogs" },
    ];

    if (isPending) {
        return <Loading />;
    }
    return (
        <>
            <Helmet>
                <title>Writer Dashboard | BlogSphere</title>
                <meta name="description" content="Access your writer dashboard to track blog status, view submissions, and collaborate with moderators on BlogSphere." />
                <meta name="keywords" content="Writer Dashboard, BlogSphere Dashboard, Blog Stats, My Blogs, Content Management" />
                <meta name="robots" content="noindex, nofollow" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Helmet>
            <PageHeader homeUrl="/writer/dashboard/" title={"Dashboard"} controller={"Dashboard"} controllerUrl={"/writer/dashboard/"} />
            <section className="container mx-auto px-4 mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
                    {cardData.map(({ count, Icon, color, label, link }, index) => (
                        <Link to={link || "#"} key={index} className="w-full">
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
                <div className="w-full space-y-4">
                    <div className="border border-gray-700 bg-gray-800 rounded p-4">
                        <h3 className="text-2xl font-bold underline mb-7">Blog Status Details</h3>
                        <BlogStatusLineChart data={blogStatusChart} />
                    </div>
                    <div className="border border-gray-700 bg-gray-800 rounded p-4">
                        <h3 className="text-2xl font-bold underline mb-7">Category Blogs</h3>
                        <BlogStatusChart data={categoryChart} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Dashboard;
