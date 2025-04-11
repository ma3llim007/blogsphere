import { Blog } from "../../models/blog.model.js";
import { Category } from "../../models/category.model.js";
import { Enquiry } from "../../models/enquiry.model.js";
import { Moderator } from "../../models/moderator.model.js";
import { Writer } from "../../models/writer.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";

const dashboardAnalytic = asyncHandler(async (req, res) => {
    try {
        // Define all blog statuses
        const blogStatuses = ["Needs Revisions", "Approved", "Rejected"];

        // Parallel aggregation for performance
        const [blogsByStatus, blogsByCategory, totalEnquiries, totalModerators, totalWriters, totalCategories] = await Promise.all([
            Blog.aggregate([
                {
                    $group: {
                        _id: "$blogStatus",
                        count: { $sum: 1 },
                    },
                },
            ]),
            Category.aggregate([
                {
                    $lookup: {
                        from: "blogs",
                        let: { categoryId: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: ["$blogCategory", "$$categoryId"] },
                                },
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
                        value: { $ifNull: [{ $arrayElemAt: ["$blogs.count", 0] }, 0] },
                    },
                },
                { $sort: { value: -1 } },
            ]),
            Enquiry.countDocuments(),
            Moderator.countDocuments(),
            Writer.countDocuments(),
            Category.countDocuments(),
        ]);

        // Convert status counts to a lookup map
        const statusCountMap = blogsByStatus.reduce((acc, { _id, count }) => {
            acc[_id] = count;
            return acc;
        }, {});

        const blogStatusChart = blogStatuses.map((status) => ({
            name: status,
            value: statusCountMap[status] || 0,
        }));

        const totalBlogs = blogStatusChart.reduce((sum, { value }) => sum + value, 0);

        const cards = {
            totalEnquiries,
            totalModerators,
            totalWriters,
            totalCategories,
            totalBlogs,
            totalNeedsRevisionBlogs: statusCountMap["Needs Revisions"] || 0,
            totalApprovedBlogs: statusCountMap["Approved"] || 0,
            totalRejectedBlogs: statusCountMap["Rejected"] || 0,
        };

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    cards,
                    categoryChart: blogsByCategory,
                    blogStatusChart,
                },
                "Dashboard Statistics Fetched Successfully"
            )
        );
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching The Dashboard Statistics"));
    }
});

export { dashboardAnalytic };
