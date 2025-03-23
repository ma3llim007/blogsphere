import { Blog } from "../../models/blog.model.js";
import { Category } from "../../models/category.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";
import { uploadCloudinary } from "../../utils/cloudinary.js";
import { ConvertImageWebp } from "../../utils/ConvertImageWebp.js";

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
// Add Blog
const addBlog = asyncHandler(async (req, res) => {
    try {
        const { blogTitle, blogSlug, blogShortDescription, blogDescription, blogCategory, blogStatus } = req.body;
        const { blogFeatureImage, blogDetailImage } = req.files;

        if (!blogTitle?.trim() || !blogSlug?.trim() || !blogShortDescription?.trim() || !blogDescription?.trim() || !blogCategory?.trim()) {
            return res.status(422).json(new ApiError(422, "All Fields Are Required"));
        }
        if (!blogFeatureImage) {
            return res.status(422).json(new ApiError(422, "Blog Feature Image Is Required"));
        }
        if (!blogDetailImage) {
            return res.status(422).json(new ApiError(422, "Blog Detail Image Is Required"));
        }

        const blogExisted = await Blog.findOne({ blogSlug });
        if (blogExisted) {
            return res.status(409).json(new ApiError(409, "Blog Is Already Exists"));
        }

        // Convert Image To WebP
        let convertedImagePathFeatured = blogFeatureImage[0];
        if (blogFeatureImage[0].mimetype !== "image/webp") {
            try {
                convertedImagePathFeatured = await ConvertImageWebp(blogFeatureImage[0].path);
            } catch (_error) {
                return res.status(500).json(new ApiError(500, "Failed To Convert Image To WebP Of Blog Feature Image"));
            }
        }
        let convertedImagePathDetail = blogDetailImage[0];
        if (blogDetailImage[0].mimetype !== "image/webp") {
            try {
                convertedImagePathDetail = await ConvertImageWebp(blogDetailImage[0].path);
            } catch (_error) {
                return res.status(500).json(new ApiError(500, "Failed To Convert Image To WebP Of Blog Detail Image"));
            }
        }

        // Upload On Cloudinary
        let blogFeatureImageUpload;
        try {
            blogFeatureImageUpload = await uploadCloudinary(convertedImagePathFeatured, "sameerblogs/blogs/");
        } catch (_error) {
            return res.status(500).json(new ApiError(500, "Failed To Upload Blog Feature Image."));
        }

        let blogDetailImageUpload;
        try {
            blogDetailImageUpload = await uploadCloudinary(convertedImagePathDetail, "sameerblogs/blogs/");
        } catch (_error) {
            return res.status(500).json(new ApiError(500, "Failed To Upload Blog Detail Image."));
        }

        const blog = await Blog.create({
            blogTitle,
            blogSlug,
            blogFeatureImage: blogFeatureImageUpload.secure_url,
            blogDetailImage: blogDetailImageUpload.secure_url,
            blogShortDescription,
            blogDescription,
            blogCategory,
            blogAuthorId: req.writer._id,
            blogStatus,
        });
        return res.status(201).json(new ApiResponse(201, blog, "Blog Instead Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Adding Blog"));
    }
});

// Blog List
const blogs = asyncHandler(async (req, res) => {
    const id = req.writer._id;
    try {
        const blogs = await Blog.find({ blogAuthorId: id }).populate("blogCategory", "categoryName").select("-blogDetailImage -blogShortDescription -blogDescription -blogAuthorId -createdAt").lean();
        if (!blogs.length) {
            return res.status(200).json(new ApiResponse(200, {}, "No Blog Found"));
        }
        return res.status(200).json(new ApiResponse(200, blogs, "Blogs Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching Blog"));
    }
});

export { addBlog, blogs, getOptionsCategory };
