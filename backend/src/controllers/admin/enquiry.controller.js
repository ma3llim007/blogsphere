import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";
import { Enquiry } from "../../models/Enquiry.model.js";

// Enquiry Listing
const enquiryListing = asyncHandler(async (req, res) => {
    try {
        const enquires = await Enquiry.find().lean();

        if (!enquires.length) {
            return res.status(200).json(new ApiResponse(200, {}, "No Enquiry Found"));
        }

        return res.status(200).json(new ApiResponse(200, enquires, "Enquiry Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching Enquiry"));
    }
});

export { enquiryListing };
