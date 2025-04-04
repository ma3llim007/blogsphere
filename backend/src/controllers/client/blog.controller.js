import { Blog } from "../../models/blog.model.js";
import { Category } from "../../models/category.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";

// Fetch All Approved Blogs
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

        const blogs = await Blog.find({ blogStatus: "Approved" })
            .skip(skip)
            .limit(limit)
            .sort({ updatedAt: -1 })
            .populate("blogCategory", "categoryName")
            .select("blogTitle blogSlug blogFeatureImage blogShortDescription blogCategory updatedAt");

        // If no blogs are found, handle the empty state
        if (!blogs.length) {
            return res.status(200).json(new ApiResponse(200, { blogs: [], page, totalPages }, "No Blogs Found"));
        }

        return res.status(200).json(new ApiResponse(200, { blogs, page, totalPages }, "Blogs Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong While Fetching Blogs"));
    }
});

// Fetch Approved Blogs By Category
const categoryByBlogs = asyncHandler(async (req, res) => {
    const { categorySlug } = req.params;
    if (!categorySlug?.trim()) {
        return res.status(429).json(new ApiError(429, "Category Slug Is Required"));
    }
    const category = await Category.findOne({ categorySlug }).select("_id");

    try {
        // Parse pagination parameters
        let page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const skip = (page - 1) * limit;

        // Get total blog count & calculate total pages
        const totalBlogs = await Blog.countDocuments({ blogStatus: "Approved", blogCategory: category?._id });
        const totalPages = Math.ceil(totalBlogs / limit);

        // Adjust page if it exceeds total pages
        if (page > totalPages && totalBlogs > 0) {
            page = totalPages;
        }

        const blogs = await Blog.find({ blogStatus: "Approved", blogCategory: category?._id })
            .skip(skip)
            .limit(limit)
            .sort({ updatedAt: -1 })
            .populate("blogCategory", "categoryName")
            .select("blogTitle blogSlug blogFeatureImage blogShortDescription blogCategory updatedAt");

        // If no blogs are found, handle the empty state
        if (!blogs.length) {
            return res.status(200).json(new ApiResponse(200, { blogs: [], page, totalPages }, "No Blogs Found"));
        }

        return res.status(200).json(new ApiResponse(200, { blogs, page, totalPages }, "Blogs Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong While Fetching Category With Blogs"));
    }
});

// View Blog Details
const blogDetails = asyncHandler(async (req, res) => {
    const { blogSlug } = req.params;
    if (!blogSlug) {
        return res.status(422).json(new ApiError(422, "Blog Slug Is Required"));
    }

    try {
        const blog = await Blog.findOne({ blogSlug }, "-blogSlug -blogShortDescription -blogStatus -createdAt -blogModeratorId -__v")
            .populate({ path: "blogCategory", select: "categoryName" })
            .populate({ path: "blogAuthorId", select: "firstName lastName" })
            .lean();

        if (!blog) {
            return res.status(400).json(new ApiError(400, "Blog Not Found"));
        }

        // Fetch related blogs
        const relatedBlogs = await Blog.aggregate([
            { $match: { _id: { $ne: blog?._id }, blogStatus: "Approved", blogCategory: blog.blogCategory._id } },
            { $sample: { size: 4 } },
            { $project: { blogTitle: 1, blogSlug: 1, blogFeatureImage: 1, updatedAt: 1 } },
        ]);
        
        return res.status(200).json(new ApiResponse(200, { blog, relatedBlogs }, "Blog Details Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong While Fetching Blogs Details"));
    }
});

export { blogs, categoryByBlogs, blogDetails };
