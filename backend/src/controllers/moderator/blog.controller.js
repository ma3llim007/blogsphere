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
const latestBlog = asyncHandler(async (req, res) => {
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
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json(new ApiError(404, "Blog Not Found"));
        }

        return res.status(200).json(new ApiResponse(200, blog, "Blog Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetch Blog Details"));
    }
});

export { latestBlog, getOptionsCategory, getBlog };
