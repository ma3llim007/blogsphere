import { Enquiry } from "../../models/Enquiry.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";

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

export { saveEnquiry };
