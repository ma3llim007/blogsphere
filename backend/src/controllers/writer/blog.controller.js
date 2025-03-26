import { isValidObjectId } from "mongoose";
import { Blog } from "../../models/blog.model.js";
import { Category } from "../../models/category.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";
import { extractPublicId, removeImage, uploadCloudinary } from "../../utils/cloudinary.js";
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
        const blogFeatureImage = req.file;

        if (!blogTitle?.trim() || !blogSlug?.trim() || !blogShortDescription?.trim() || !blogDescription?.trim() || !blogCategory?.trim()) {
            return res.status(422).json(new ApiError(422, "All Fields Are Required"));
        }
        if (!blogFeatureImage) {
            return res.status(422).json(new ApiError(422, "Blog Feature Image Is Required"));
        }

        const blogExisted = await Blog.findOne({ blogSlug });
        if (blogExisted) {
            return res.status(409).json(new ApiError(409, "Blog Is Already Exists"));
        }

        // Convert Image To WebP
        let convertedImagePathFeatured = blogFeatureImage;
        if (blogFeatureImage.mimetype !== "image/webp") {
            try {
                convertedImagePathFeatured = await ConvertImageWebp(blogFeatureImage.path);
            } catch (_error) {
                return res.status(500).json(new ApiError(500, "Failed To Convert Image To WebP Of Blog Feature Image"));
            }
        } else {
            convertedImagePathFeatured = blogFeatureImage.path;
        }

        // Upload On Cloudinary
        let blogFeatureImageUpload;
        try {
            blogFeatureImageUpload = await uploadCloudinary(convertedImagePathFeatured, "sameerblogs/blogs/");
        } catch (_error) {
            return res.status(500).json(new ApiError(500, "Failed To Upload Blog Feature Image."));
        }

        const blog = await Blog.create({
            blogTitle,
            blogSlug,
            blogFeatureImage: blogFeatureImageUpload.secure_url,
            blogShortDescription,
            blogDescription,
            blogCategory,
            blogAuthorId: req.writer._id,
            blogStatus,
        });
        return res.status(201).json(new ApiResponse(201, blog, "Blog Instead Successfully"));
    } catch (_error) {
        console.error(_error);
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Adding Blog"));
    }
});

// Blog List
const blogs = asyncHandler(async (req, res) => {
    const id = req.writer._id;
    try {
        const blogs = await Blog.find({ blogAuthorId: id }).populate("blogCategory", "categoryName").select("-blogShortDescription -blogDescription -blogAuthorId -createdAt").lean();
        if (!blogs.length) {
            return res.status(200).json(new ApiResponse(200, {}, "No Blog Found"));
        }
        return res.status(200).json(new ApiResponse(200, blogs, "Blogs Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching Blog"));
    }
});

// Edit Blog
const editBlog = asyncHandler(async (req, res) => {
    const { blogId, blogTitle, blogSlug, blogShortDescription, blogDescription, blogCategory, blogStatus } = req.body;
    const blogFeatureImage = req.file;

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

    // Check if at least one field is provided for update
    if (!blogTitle && !blogSlug && !blogShortDescription && !blogDescription && !blogFeatureImage && !blogCategory && !blogStatus) {
        return res
            .status(400)
            .json(new ApiError(400, "At Least One Field (Title, Slug, Short Description, Description , Feature Image, Detail Image, Blog Category Or Blog Status) Is Required For Update"));
    }

    const duplicateBlog = await Blog.findOne({
        _id: { $ne: blogId },
        $or: [{ blogSlug: blogSlug ? blogSlug : blog.blogSlug }, { blogTitle: blogTitle ? blogTitle : blog.blogTitle }],
    });

    // Check if there's a conflict with either slug
    if (duplicateBlog) {
        if (duplicateBlog.blogSlug === blogSlug) {
            return res.status(409).json(new ApiError(409, "Blog Slug Already Exists"));
        }
        if (duplicateBlog.blogTitle === blogTitle) {
            return res.status(409).json(new ApiError(409, "Blog Title Already Exists"));
        }
    }

    // Update fields if there are no conflicts
    if (blogTitle) {
        blog.blogTitle = blogTitle;
    }
    if (blogSlug) {
        blog.blogSlug = blogSlug;
    }
    if (blogShortDescription) {
        blog.blogShortDescription = blogShortDescription;
    }
    if (blogDescription) {
        blog.blogDescription = blogDescription;
    }
    if (blogFeatureImage) {
        const previousImages = blog.blogFeatureImage;
        if (blogFeatureImage && previousImages) {
            const publicId = extractPublicId(previousImages);
            try {
                await removeImage("sameerblogs/blogs/", publicId);
            } catch (_error) {
                return res.status(500).json(new ApiError(500, "Failed To Remove Previous Blog Feature Image"));
            }
        }

        // Convert Image To WebP
        let convertedFeatureImage = blogFeatureImage;
        if (blogFeatureImage.mimetype !== "image/webp") {
            try {
                convertedFeatureImage = await ConvertImageWebp(blogFeatureImage.path);
            } catch (_error) {
                return res.status(500).json(new ApiError(500, "Failed to Convert Image to WebP"));
            }
        } else {
            convertedFeatureImage = blogFeatureImage.path;
        }

        // Upload to Cloudinary
        try {
            const featureImageUpload = await uploadCloudinary(convertedFeatureImage, "sameerblogs/blogs/");
            blog.blogFeatureImage = featureImageUpload.secure_url;
        } catch (_error) {
            return res.status(500).json(new ApiError(500, "Failed To Upload Feature Image."));
        }
    }

    if (blogCategory) {
        blog.blogCategory = blogCategory;
    }
    if (blogStatus) {
        blog.blogStatus = blogStatus;
    }

    await blog.save();

    return res.status(200).json(new ApiResponse(200, blog, "Blog Update Successfully"));
});

// Delete Blog
const deleteBlog = asyncHandler(async (req, res) => {
    try {
        const { blogId } = req.params;

        if (!blogId) {
            return res.status(422).json(new ApiError(422, "Blog ID is Required"));
        }
        if (!isValidObjectId(blogId)) {
            return res.status(404).json(new ApiError(404, "Invalid Blog ID"));
        }

        // Finding the Blog
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json(new ApiError(404, "Blog Not Found"));
        }

        const featureImage = blog.blogFeatureImage;

        const deleteBlog = await Blog.deleteOne({ _id: blogId });
        if (deleteBlog.deletedCount === 0) {
            return res.status(500).json(new ApiError(500, "Something Went Wrong While Deleting The Blog"));
        }

        if (deleteBlog && featureImage) {
            const publicFeatureId = extractPublicId(featureImage);
            try {
                await removeImage("sameerblogs/blogs/", publicFeatureId);
            } catch (_error) {
                return res.status(500).json(new ApiError(500, "Failed To Remove Previous Blog Feature Image"));
            }
        }

        return res.status(200).json(new ApiResponse(200, {}, "Blog Delete Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Deleting Blog"));
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

export { addBlog, blogs, getOptionsCategory, deleteBlog, getBlog, editBlog };
