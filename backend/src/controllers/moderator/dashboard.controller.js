import { Blog } from "../../models/blog.model.js";
import { Category } from "../../models/category.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";

const dashboardAnalytic = asyncHandler(async (req, res) => {
    const moderatorId = req.moderator._id;
    try {
        // Define all blog statuses
        const blogStatuses = ["Needs Revisions", "Approved", "Rejected"];

        // Run all aggregations in parallel for efficiency
        const [blogStatus] = await Promise.all([
            // Count blogs by status
            Blog.aggregate([
                { $match: { blogModeratorId: moderatorId } },
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

        // Ensure all blog statuses exist in the response
        const blogStatusChartArray = blogStatuses.map((status) => ({
            name: status,
            value: blogCountMap[status] || 0,
        }));

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    cards: {
                        latestBlogs: blogCountMap["Ready To Publish"] || 0,
                        totalNeedsRevisionBlogs: blogCountMap["Needs Revisions"] || 0,
                        totalApprovedBlogs: blogCountMap["Approved"] || 0,
                        totalRejectedBlogs: blogCountMap["Rejected"] || 0,
                    },
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
