import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";
import { Blog } from "../../models/blog.model.js";
import { Category } from "../../models/category.model.js";

const dashboardAnalytic = asyncHandler(async (req, res) => {
    const writerId = req.writer._id;
    try {
        // Aggregation pipeline to fetch count in single query
        const [blogStatus] = await Promise.all([
            Blog.aggregate([
                { $match: { blogAuthorId: writerId } },
                {
                    $group: {
                        _id: "$blogStatus",
                        count: { $sum: 1 },
                    },
                },
            ]),
        ]);

        // Convert order aggregation result to a lookup object
        const blogCountMap = blogStatus.reduce((acc, { _id, count }) => {
            acc[_id] = count;
            return acc;
        }, {});

        // Extract Blogs safely
        const totalBlogs = blogStatus?.reduce((sum, { count }) => sum + count, 0);
        const totalDraftBlogs = blogCountMap["Draft"] || 0;
        const totalReadyToPublishBlogs = blogCountMap["Ready To Publish"] || 0;
        const totalNeedsRevisionBlogs = blogCountMap["Needs Revisions"] || 0;
        const totalApprovedBlogs = blogCountMap["Approved"] || 0;
        const totalRejectedBlogs = blogCountMap["Rejected"] || 0;

        // Blogs By Category
        const blogCategoryChart = await Category.aggregate([
            {
                $lookup: {
                    from: "blogs",
                    let: { categoryId: "$_id" },
                    pipeline: [
                        {
                            $match: { $expr: { $and: [{ $eq: ["$blogCategory", "$$categoryId"] }, { $eq: ["$blogAuthorId", writerId] }] } },
                        },
                        {
                            $group: {
                                _id: null,
                                count: { $sum: 1 },
                            },
                        },
                    ],
                    as: "blogs",
                },
            },
            {
                $project: {
                    _id: 0,
                    category: "$categoryName",
                    value: {
                        $ifNull: [{ $arrayElemAt: ["$blogs.count", 0] }, 0],
                    },
                },
            },
        ]);

        const blogStatuses = ["Draft", "Ready To Publish", "Needs Revisions", "Approved", "Rejected"];
        // Blogs By Blog Status
        const [blogStatusData] = await Blog.aggregate([
            { $match: { blogAuthorId: writerId } },
            {
                $group: {
                    _id: "$blogStatus",
                    count: { $sum: 1 },
                },
            },
            {
                $group: {
                    _id: null,
                    data: { $push: { k: "$_id", v: "$count" } },
                },
            },
            {
                $project: {
                    _id: 0,
                    blogStatusChart: {
                        $mergeObjects: [blogStatuses.reduce((acc, status) => ({ ...acc, [status]: 0 }), {}), { $arrayToObject: "$data" }],
                    },
                },
            },
        ]);
        // Convert blogStatusChart into an array for Pie Chart
        const blogStatusChartArray = Object.entries(blogStatusData?.blogStatusChart || {}).map(([name, value]) => ({ name, value }));

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    cards: {
                        totalBlogs,
                        totalDraftBlogs,
                        totalReadyToPublishBlogs,
                        totalNeedsRevisionBlogs,
                        totalApprovedBlogs,
                        totalRejectedBlogs,
                    },
                    categoryChart: blogCategoryChart,
                    blogStatusChart: blogStatusChartArray,
                },
                "Dashboard Statistics Fetched Successfully"
            )
        );
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching The Dashboard Statistics"));
    }
});

export { dashboardAnalytic };
