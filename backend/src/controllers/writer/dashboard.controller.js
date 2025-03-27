import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";
import { Blog } from "../../models/blog.model.js";
import { Category } from "../../models/category.model.js";

const dashboardAnalytic = asyncHandler(async (req, res) => {
    const writerId = req.writer._id;
    try {
        // Define all blog statuses
        const blogStatuses = ["Draft", "Ready To Publish", "Needs Revisions", "Approved", "Rejected"];

        // Run all aggregations in parallel for efficiency
        const [blogStatus, blogCategoryChart] = await Promise.all([
            // Count blogs by status
            Blog.aggregate([
                { $match: { blogAuthorId: writerId } },
                {
                    $group: {
                        _id: "$blogStatus",
                        count: { $sum: 1 },
                    },
                },
            ]),

            // Count blogs by category (ensuring categories with 0 blogs are included)
            Category.aggregate([
                {
                    $lookup: {
                        from: "blogs",
                        let: { categoryId: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [{ $eq: ["$blogCategory", "$$categoryId"] }, { $eq: ["$blogAuthorId", writerId] }],
                                    },
                                },
                            },
                            { $group: { _id: null, count: { $sum: 1 } } },
                        ],
                        as: "blogs",
                    },
                },
                {
                    $project: {
                        _id: 0,
                        category: "$categoryName",
                        value: { $ifNull: [{ $arrayElemAt: ["$blogs.count", 0] }, 0] }, // Default to 0
                    },
                },
                { $sort: { value: -1 } },
            ]),
        ]);

        // Convert order aggregation result to a lookup object
        const blogCountMap = blogStatus.reduce((acc, { _id, count }) => {
            acc[_id] = count;
            return acc;
        }, {});

        // Ensure all blog statuses exist in the response
        const blogStatusChartArray = blogStatuses.map((status) => ({
            name: status,
            value: blogCountMap[status] || 0,
        }));

        // Calculate total blog counts
        const totalBlogs = blogStatusChartArray.reduce((sum, { value }) => sum + value, 0);

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    cards: {
                        totalBlogs,
                        totalDraftBlogs: blogCountMap["Draft"] || 0,
                        totalReadyToPublishBlogs: blogCountMap["Ready To Publish"] || 0,
                        totalNeedsRevisionBlogs: blogCountMap["Needs Revisions"] || 0,
                        totalApprovedBlogs: blogCountMap["Approved"] || 0,
                        totalRejectedBlogs: blogCountMap["Rejected"] || 0,
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
