import Loading from "@/components/common/Loading";
import PageHeader from "@/components/common/PageHeader";
import BlogStatusLineChart from "@/components/writer/dashboard/BlogStatusLineChart";
import crudService from "@/services/crudService";
import toastService from "@/services/toastService";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaBan, FaCheck, FaExclamationTriangle, FaPenFancy } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
    // fetching data of writer
    const { data, isPending } = useQuery({
        queryKey: ["moderatorAccount"],
        queryFn: () => crudService.get(`moderator/dashboard/analytic`),
        onError: err => {
            toastService.error(err?.message || "Failed to fetch Data.");
        },
    });

    const { cards, blogStatusChart } = data?.data || {};

    const cardData = [
        { count: cards?.latestBlogs, Icon: FaPenFancy, label: "Latest Blogs", color: "text-blue-600", link: "/moderator/blogs/latest-blogs" },
        { count: cards?.totalApprovedBlogs, Icon: FaCheck, label: "Approved Blogs", color: "text-green-600", link: "/moderator/blogs/approved-blogs" },
        { count: cards?.totalNeedsRevisionBlogs, Icon: FaExclamationTriangle, label: "Needs Revisions Blogs", color: "text-yellow-500", link: "/moderator/blogs/needs-revisions-blogs" },
        { count: cards?.totalRejectedBlogs, Icon: FaBan, label: "Rejected Blogs", color: "text-red-600", link: "/moderator/blogs/rejected-blogs" },
    ];

    if (isPending) {
        return <Loading />;
    }
    return (
        <>
            <Helmet>
                <title>Moderator Dashboard | BlogSphere</title>
                <meta name="description" content="Access the Moderator Dashboard on BlogSphere to review blog submissions, approve content, and collaborate with writers." />
                <meta name="keywords" content="Moderator Dashboard, BlogSphere Moderator Panel, Blog Review, Content Approval, Blog Management, Writer Collaboration" />
                <meta name="robots" content="noindex, nofollow" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Helmet>
            <PageHeader homeUrl="/moderator/dashboard/" title={"Dashboard"} controller={"Dashboard"} controllerUrl={"/moderator/dashboard/"} />
            <section className="container mx-auto px-4 mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
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
                        <h3 className="text-2xl font-bold underline mb-7">Blog Status Overview</h3>
                        <BlogStatusLineChart data={blogStatusChart} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Dashboard;
