import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";
import { Category } from "../../models/category.model.js";
import { Enquiry } from "../../models/Enquiry.model.js";

const headerCategory = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find().select("categoryName categorySlug");

        return res.status(200).json(new ApiResponse(200, categories, "Categories Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching Header Categories"));
    }
});

const categories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find().select("categoryName categorySlug categoryImage");

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
