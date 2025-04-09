import { isValidObjectId } from "mongoose";
import { Blog } from "../../models/blog.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";

// Approved Blogs
const approvedBlogs = asyncHandler(async (req, res) => {});

// Revision Blogs
const revisionBlogs = asyncHandler(async (req, res) => {
    try {
        const blogs = await Blog.find({ blogStatus: "Needs Revisions" })
            .populate("blogCategory", "categoryName")
            .populate("blogAuthorId", "firstName lastName")
            .populate("blogModeratorId", "firstName lastName")
            .select("-blogShortDescription -blogDescription -createdAt");

        if (!blogs.length) {
            return res.status(200).json(new ApiResponse(200, {}, "No Revision Blog Found"));
        }

        return res.status(200).json(new ApiResponse(200, blogs, "Revision Blogs Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching Revision Blogs"));
    }
});

// Rejected Blogs
const rejectedBlogs = asyncHandler(async (req, res) => {
    try {
        const blogs = await Blog.find({ blogStatus: "Rejected" })
            .populate("blogCategory", "categoryName")
            .populate("blogAuthorId", "firstName lastName")
            .populate("blogModeratorId", "firstName lastName")
            .select("-blogShortDescription -blogDescription -createdAt");

        if (!blogs.length) {
            return res.status(200).json(new ApiResponse(200, {}, "No Rejected Blog Found"));
        }

        return res.status(200).json(new ApiResponse(200, blogs, "Rejected Blogs Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching Rejected Blogs"));
    }
});

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
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching All Blogs"));
    }
});

// View Blog
const viewBlogs = asyncHandler(async (req, res) => {
    const { blogId } = req.params;

    if (!blogId) {
        return res.status(429).json(new ApiError(429, "Blog Is Required"));
    }

    if (!isValidObjectId(blogId)) {
        return res.status(400).json(new ApiError(400, "Blog Id Is Not Valid"));
    }

    try {
        const blogs = await Blog.findById(blogId).populate("blogCategory", "categoryName").populate("blogAuthorId", "firstName lastName").populate("blogModeratorId", "firstName lastName");

        if (!blogs) {
            return res.status(200).json(new ApiResponse(200, {}, "No Blog Found"));
        }

        return res.status(200).json(new ApiResponse(200, blogs, "Blog Details Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! while Fetching Blogs Details"));
    }
});

export { approvedBlogs, revisionBlogs, rejectedBlogs, allBlogs, viewBlogs };
