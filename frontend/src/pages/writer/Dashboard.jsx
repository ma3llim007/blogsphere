import Loading from "@/components/common/Loading";
import PageHeader from "@/components/common/PageHeader";
import BlogStatusLineChart from "@/components/writer/dashboard/BlogStatusLineChart";
import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaBlogger, FaCheckCircle, FaClipboardList, FaEdit, FaFileAlt, FaTimesCircle } from "react-icons/fa";
import BlogStatusChart from "@/components/writer/dashboard/BlogStatusChart";

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
        { count: cards?.totalBlogs, Icon: FaBlogger, label: "Total Blogs", color: "text-white" },
        { count: cards?.totalDraftBlogs, Icon: FaFileAlt, label: "Draft Blogs", color: "text-gray-100" },
        { count: cards?.totalReadyToPublishBlogs, Icon: FaClipboardList, label: "Ready To Publish Blogs", color: "text-blue-500" },
        { count: cards?.totalNeedsRevisionBlogs, Icon: FaEdit, label: "Needs Revisions Blogs", color: "text-orange-600" },
        { count: cards?.totalApprovedBlogs, Icon: FaCheckCircle, label: "Approved Blogs", color: "text-green-500" },
        { count: cards?.totalRejectedBlogs, Icon: FaTimesCircle, label: "Rejected Blogs", color: "text-red-500" },
    ];

    if (isPending) {
        return <Loading />;
    }
    return (
        <>
            <Helmet>
                <title>Writer Dashboard | BlogSphere</title>
                <meta name="description" content="Manage your blog posts, track progress, and submit articles for review in the BlogSphere writer dashboard." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <PageHeader homeUrl="/writer/dashboard/" title={"Dashboard"} controller={"Dashboard"} controllerUrl={"/writer/dashboard/"} />
            <section className="container mx-auto px-4 mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
                    {cardData.map(({ count, Icon, color, label }, index) => (
                        <div
                            key={index}
                            className="w-full border border-gray-700 dark:border-gray-500/30 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 bg-gray-100 dark:bg-gray-800 hover:shadow-lg hover:shadow-blue-500/40 dark:hover:shadow-blue-400/20 cursor-pointer space-y-4"
                        >
                            <div className="flex items-center gap-4 text-3xl font-semibold text-gray-900 dark:text-gray-100">
                                {Icon && <Icon size={25} className={color} />}
                                <h4>{count || 0}</h4>
                            </div>
                            <p className="text-lg font-bold text-gray-700 dark:text-gray-300">{label}</p>
                        </div>
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
