import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";
import { Category } from "../../models/category.model.js";
import { Enquiry } from "../../models/Enquiry.model.js";
import { generateCacheKey } from "../../utils/utils.js";
import redisClient from "../../config/redis.js";

const headerCategory = asyncHandler(async (req, res) => {
    try {
        // Generate a Unique cache key based on page & limit
        // const key = generateCacheKey(req);

        // Check if data exists in Redis cache
        // const cacheData = await redisClient.get(key);
        // if (cacheData) {
        //     return res.status(200).json(new ApiResponse(200, JSON.parse(cacheData), "Categories Fetch Successfully"));
        // }

        const categories = await Category.find().select("categoryName categorySlug");

        // Saving the data in cache
        // await redisClient.setEx(key, 600, JSON.stringify(categories));

        return res.status(200).json(new ApiResponse(200, categories, "Categories Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching Header Categories"));
    }
});

const categories = asyncHandler(async (req, res) => {
    try {
        // Generate a Unique cache key based on page & limit
        // const key = generateCacheKey(req);

        // Check if data exists in Redis cache
        // const cacheData = await redisClient.get(key);
        // if (cacheData) {
        //     return res.status(200).json(new ApiResponse(200, JSON.parse(cacheData), "Categories Fetch Successfully"));
        // }

        const categories = await Category.find().select("categoryName categorySlug categoryImage");

        // Saving the data in cache
        // await redisClient.setEx(key, 600, JSON.stringify(categories));

        return res.status(200).json(new ApiResponse(200, categories, "Categories Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching Header Categories"));
    }
});

const saveEnquiry = asyncHandler(async (req, res) => {
    try {
        const { name, email, phoneNumber, subject, message } = req.body;
        if (!name?.trim() || !email?.trim() || !phoneNumber?.trim() || !subject?.trim() || !message?.trim()) {
            return res.status(422).json(new ApiError(422, "All fields are required."));
        }

        await Enquiry.create({
            name,
            email,
            phoneNumber,
            subject,
            message,
        });
        return res.status(201).json(new ApiResponse(201, {}, "Contact Message Successfully Send To Admin."));
    } catch (_error) {
        return res.status(500).json(new ApiResponse(500, "Something Went Wrong While Saving Enquiry"));
    }
});

export { headerCategory, categories, saveEnquiry };
