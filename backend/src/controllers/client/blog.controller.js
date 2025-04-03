import { Blog } from "../../models/blog.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";

const blogs = asyncHandler(async (req, res) => {
    try {
        // Parse pagination parameters
        let page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const skip = (page - 1) * limit;

        // Get total blog count & calculate total pages
        const totalBlogs = await Blog.countDocuments({ blogStatus: "Approved" });
        const totalPages = Math.ceil(totalBlogs / limit);

        // Adjust page if it exceeds total pages
        if (page > totalPages && totalBlogs > 0) {
            page = totalPages;
        }

        const blogs = await Blog.find({ blogStatus: "Approved" }).skip(skip).limit(limit).sort({ createdAt: -1 }).select("blogTitle blogSlug blogFeatureImage blogShortDescription createdAt");

        // If no blogs are found, handle the empty state
        if (!blogs.length) {
            return res.status(200).json(new ApiResponse(200, { blogs: [], page, totalPages }, "No Blogs Found"));
        }

        return res.status(200).json(new ApiResponse(200, { blogs, page, totalPages }, "Blogs Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong While Fetching Blogs"));
    }
});

export { blogs };
