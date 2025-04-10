import redisClient from "../../config/redis.js";
import { Blog } from "../../models/blog.model.js";
import { Category } from "../../models/category.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";
import { generateCacheKey } from "../../utils/utils.js";

// Fetch All Approved Blogs
const blogs = asyncHandler(async (req, res) => {
    try {
        // Parse pagination parameters
        let page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const skip = (page - 1) * limit;

        // Generate a Unique cache key based on page & limit
        // const key = generateCacheKey(req);

        // Check if data exists in Redis cache
        // const cacheData = await redisClient.get(key);
        // if (cacheData) {
        //     return res.status(200).json(new ApiResponse(200, JSON.parse(cacheData), "Blogs Fetch Successfully"));
        // }

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

        // Saving the data in cache
        // await redisClient.setEx(key, 600, JSON.stringify({ blogs, page, totalPages }));

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

        // Generate a Unique cache key based on page & limit
        // const key = generateCacheKey(req);

        // Check if data exists in Redis cache
        // const cacheData = await redisClient.get(key);
        // if (cacheData) {
        //     return res.status(200).json(new ApiResponse(200, JSON.parse(cacheData), "Blogs Fetch Successfully"));
        // }

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

        // Saving the data in cache
        // await redisClient.setEx(key, 600, JSON.stringify({ blogs, page, totalPages }));

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

    // Generate a Unique cache key based on page & limit
    // const key = generateCacheKey(req);

    // Check if data exists in Redis cache
    // const cacheData = await redisClient.get(key);
    // if (cacheData) {
    //     return res.status(200).json(new ApiResponse(200, JSON.parse(cacheData), "Blog Details Fetch Successfully"));
    // }

    try {
        const blog = await Blog.findOne({ blogSlug }, "-blogSlug -blogStatus -createdAt -blogModeratorId -__v")
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

        // Saving the data in cache
        // await redisClient.setEx(key, 300, JSON.stringify({ blogs, relatedBlogs }));

        return res.status(200).json(new ApiResponse(200, { blog, relatedBlogs }, "Blog Details Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong While Fetching Blogs Details"));
    }
});

// Latest And Random Blogs
const latestRandomBlogs = asyncHandler(async (req, res) => {
    try {
        // Generate a Unique cache key based on page & limit
        // const key = generateCacheKey(req);

        // Check if data exists in Redis cache
        // const cacheData = await redisClient.get(key);
        // if (cacheData) {
        //     return res.status(200).json(new ApiResponse(200, JSON.parse(cacheData), "Latest Blogs Fetch Successfully"));
        // }

        // Latest Blogs
        const latestBlogs = await Blog.find({ blogStatus: "Approved" })
            .sort({ updatedAt: -1 })
            .limit(9)
            .populate("blogCategory", "categoryName")
            .select("blogTitle blogSlug blogShortDescription blogCategory updatedAt blogFeatureImage");

        // random Blogs
        const randomBlogs = await Blog.aggregate([
            { $match: { blogStatus: "Approved" } },
            { $sample: { size: 4 } },
            {
                $lookup: {
                    from: "categories",
                    localField: "blogCategory",
                    foreignField: "_id",
                    as: "category",
                },
            },
            { $unwind: "$category" },
            {
                $project: {
                    blogTitle: 1,
                    blogSlug: 1,
                    blogFeatureImage: 1,
                    category: "$category.categoryName",
                    updatedAt: 1,
                },
            },
        ]);
        
        // Saving the data in cache
        // await redisClient.setEx(key, 600, JSON.stringify({ latestBlogs, randomBlogs }));

        return res.status(200).json(new ApiResponse(200, { latestBlogs, randomBlogs }, "Latest Blogs Fetch Successfully"));
    } catch (_error) {
        console.error(_error);

        return res.status(500).json(new ApiError(500, "Something Went Wrong While Fetching Latest Blogs"));
    }
});

// Searching For Blogs
const searchBlogs = asyncHandler(async (req, res) => {
    try {
        const { term } = req.query;

        const blogs = await Blog.find({
            blogStatus: "Approved",
            blogTitle: { $regex: term, $options: "i" },
        })
            .limit(6)
            .select("blogTitle blogSlug")
            .sort({ blogTitle: 1 });

        if (!blogs.length) {
            return res.status(404).json(new ApiResponse(404, null, "No Matching Blogs Found"));
        }

        return res.status(200).json(new ApiResponse(200, blogs, "Blogs Fetched Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Searching For Blogs"));
    }
});

export { blogs, categoryByBlogs, blogDetails, latestRandomBlogs, searchBlogs };
