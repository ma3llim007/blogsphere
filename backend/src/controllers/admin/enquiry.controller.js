import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";
import { Enquiry } from "../../models/enquiry.model.js";
import { isValidObjectId } from "mongoose";

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

// View Enquiry
const viewEnquiry = asyncHandler(async (req, res) => {
    const { enquiryId } = req.params;
    try {
        const enquiry = await Enquiry.findById(enquiryId).lean();

        if (!enquiry) {
            return res.status(200).json(new ApiResponse(200, {}, "No Enquiry Found"));
        }

        return res.status(200).json(new ApiResponse(200, enquiry, "Enquiry Details Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching Enquiry Details"));
    }
});

// Delete Enquiry
const deleteEnquiry = asyncHandler(async (req, res) => {
    try {
        const { enquiryId } = req.params;

        if (!enquiryId || enquiryId.trim() === "") {
            return res.status(422).json(new ApiError(422, "Enquiry ID Is Required"));
        }

        if (!isValidObjectId(enquiryId)) {
            return res.status(400).json(new ApiError(400, "Invalid Enquiry ID"));
        }

        const enquiry = await Enquiry.findById(enquiryId);
        if (!enquiry) {
            return res.status(404).json(new ApiError(401, "Contact Not Found"));
        }

        const deleteContact = await Enquiry.deleteOne({ _id: enquiryId });
        if (deleteContact.deletedCount === 0) {
            return res.status(500).json(new ApiError(500, "Something Went Wrong While Deleting The Enquiry"));
        }

        return res.status(200).json(new ApiResponse(200, {}, "Enquiry Delete Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Deleting Enquiry"));
    }
});

export { enquiryListing, viewEnquiry, deleteEnquiry };
