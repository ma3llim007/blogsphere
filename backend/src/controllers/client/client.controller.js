import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";
import { Category } from "../../models/category.model.js";

const headerCategory = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find().select("categoryName categorySlug");
        
        return res.status(200).json(new ApiResponse(200, categories, "Categories Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching Header Categories"));
    }
});

export { headerCategory };
