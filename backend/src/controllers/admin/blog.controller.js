import { Blog } from "../../models/blog.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";

// Approved Blogs
const approvedBlogs = asyncHandler(async (req, res) => {});

// Revision Blogs
const revisionBlogs = asyncHandler(async (req, res) => {});

// Rejected Blogs
const rejectedBlogs = asyncHandler(async (req, res) => {});

// All Blogs
const allBlogs = asyncHandler(async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate("blogCategory", "categoryName")
            .populate("blogAuthorId", "firstName lastName")
            .populate("blogModeratorId", "firstName lastName")
            .select("-blogShortDescription -blogDescription -createdAt");
        if (!blogs.length) {
            return res.status(200).json(new ApiResponse(200, {}, "No Blog Found"));
        }
        
        return res.status(200).json(new ApiResponse(200, blogs, "Blogs Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! while Fetching All Blogs"));
    }
});

export { approvedBlogs, revisionBlogs, rejectedBlogs, allBlogs };
