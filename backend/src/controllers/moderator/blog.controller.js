import { isValidObjectId } from "mongoose";
import { Blog } from "../../models/blog.model.js";
import { Category } from "../../models/category.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";

// options category with only name and _id
const getOptionsCategory = asyncHandler(async (req, res) => {
    const category = await Category.aggregate([
        {
            $project: {
                categoryName: 1,
                _id: 1,
            },
        },
    ]);
    return res.status(200).json(new ApiResponse(200, category, "Categories Options Fetch Successfully"));
});

// latest Blog
const latestBlogs = asyncHandler(async (req, res) => {
    try {
        const blogs = await Blog.find({ blogStatus: "Ready To Publish" }).populate("blogCategory", "categoryName").select("-blogShortDescription -blogDescription -blogAuthorId -createdAt").lean();
        if (!blogs.length) {
            return res.status(200).json(new ApiResponse(200, {}, "No Blog Found"));
        }
        return res.status(200).json(new ApiResponse(200, blogs, "Blogs Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching Blog"));
    }
});

// Get Blog By ID
const getBlog = asyncHandler(async (req, res) => {
    try {
        const { blogId } = req.params;

        if (!blogId) {
            return res.status(422).json(new ApiError(422, "Blog ID is Required"));
        }

        if (!isValidObjectId(blogId)) {
            return res.status(404).json(new ApiError(404, "Invalid Blog Id"));
        }

        // Finding the Blog
        const blog = await Blog.findById(blogId).populate("blogCategory", "categoryName");

        if (!blog) {
            return res.status(404).json(new ApiError(404, "Blog Not Found"));
        }

        return res.status(200).json(new ApiResponse(200, blog, "Blog Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetch Blog Details"));
    }
});

// Review Blog
const reviewBlog = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.moderator;
        const { blogId } = req.params;
        const { blogStatus, revisionMessage, rejectedMessage } = req.body;

        if (!blogId) {
            return res.status(422).json(new ApiError(422, "Blog ID Is Required"));
        }

        if (!isValidObjectId(blogId)) {
            return res.status(404).json(new ApiError(404, "Invalid Blog Id"));
        }

        if (!blogStatus?.trim()) {
            return res.status(400).json(new ApiError(400, "Blog Status Is Required"));
        }

        if (blogStatus === "Needs Revisions" && !revisionMessage?.trim()) {
            return res.status(400).json(new ApiError(400, "Revision Message Is Required For 'Need Revision' Status"));
        }

        if (blogStatus === "Rejected" && !rejectedMessage?.trim()) {
            return res.status(400).json(new ApiError(400, "Rejection Message Is Required For 'Rejected' Status"));
        }

        // Finding the Blog
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json(new ApiError(404, "Blog Not Found"));
        }

        // Update Field
        blog.blogStatus = blogStatus;
        if (blogStatus === "Needs Revisions") {
            blog.blogRevisionMessage = revisionMessage;
        }
        if (blogStatus === "Rejected") {
            blog.blogRejectedMessage = rejectedMessage;
        }
        blog.blogModeratorId = _id;

        await blog.save();

        return res.status(200).json(new ApiResponse(200, {}, "Blog Status Update Successfully"));
    } catch (_error) {
        console.error(_error);

        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Review Blog"));
    }
});

// approach Blog
const approvedBlogs = asyncHandler(async (req, res) => {
    const moderatorId = req.moderator._id;

    try {
        const blogs = await Blog.find({ blogModeratorId: moderatorId, blogStatus: "Approved" })
            .populate("blogCategory", "categoryName")
            .select("-blogShortDescription -blogDescription -blogAuthorId -createdAt")
            .lean();

        if (!blogs.length) {
            return res.status(200).json(new ApiResponse(200, {}, "No Blog Found"));
        }

        return res.status(200).json(new ApiResponse(200, blogs, "Approved Blogs Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching Approved Blog"));
    }
});

// Needs Revision Blog
const needRevisionBlogs = asyncHandler(async (req, res) => {
    const moderatorId = req.moderator._id;

    try {
        const blogs = await Blog.find({ blogModeratorId: moderatorId, blogStatus: "Needs Revisions" })
            .populate("blogCategory", "categoryName")
            .select("-blogShortDescription -blogDescription -blogAuthorId -createdAt")
            .lean();

        if (!blogs.length) {
            return res.status(200).json(new ApiResponse(200, {}, "No Blog Found"));
        }

        return res.status(200).json(new ApiResponse(200, blogs, "Needs Revisions Blogs Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching Needs Revisions Blog"));
    }
});

// Rejected Blog
const rejectedBlogs = asyncHandler(async (req, res) => {
    const moderatorId = req.moderator._id;

    try {
        const blogs = await Blog.find({ blogModeratorId: moderatorId, blogStatus: "Rejected" })
            .populate("blogCategory", "categoryName")
            .select("-blogShortDescription -blogDescription -blogAuthorId -createdAt")
            .lean();

        if (!blogs.length) {
            return res.status(200).json(new ApiResponse(200, {}, "No Blog Found"));
        }

        return res.status(200).json(new ApiResponse(200, blogs, "Rejected Blogs Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching Rejected Blogs"));
    }
});

export { latestBlogs, getOptionsCategory, getBlog, reviewBlog, approvedBlogs, needRevisionBlogs, rejectedBlogs };
