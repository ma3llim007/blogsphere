import { isValidObjectId } from "mongoose";
import { Moderator } from "../../models/moderator.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";

// Register Moderator
const registerModerator = asyncHandler(async (req, res) => {
    try {
        const { firstName, lastName, username, email, phoneNumber, password } = req.body;
        if (!firstName?.trim() || !lastName?.trim() || !username?.trim() || !email?.trim() || !phoneNumber?.trim() || !password?.trim()) {
            return res.status(422).json(new ApiError(422, "All Field Are Required"));
        }

        const existedModerator = await Moderator.findOne({ email });
        if (existedModerator) {
            return res.status(409).json(new ApiError(409, "E-Mail Is Already Exists"));
        }

        await Moderator.create({
            firstName,
            lastName,
            username,
            email,
            phoneNumber,
            password,
        });

        return res.status(201).json(new ApiResponse(201, {}, "Moderator Register Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Registering Moderator"));
    }
});

// Delete Moderator
const deleteModerator = asyncHandler(async (req, res) => {
    const { moderatorId } = req.params;

    if (!isValidObjectId(moderatorId)) {
        return res.status(422).json(new ApiError(422, "Moderator Id Is Required"));
    }

    const moderator = await Moderator.findById(moderatorId);
    if (!moderator) {
        return res.status(400).json(new ApiError(400, "Moderator Is Not Found"));
    }

    const moderatorDelete = await Moderator.deleteOne({ _id: moderatorId });

    if (moderatorDelete.deletedCount === 0) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Deleting Moderator"));
    }

    return res.status(200).json(new ApiResponse(200, {}, "Moderator Delete Successfully"));
});

// List Moderator
const listModerator = asyncHandler(async (req, res) => {
    try {
        const moderators = await Moderator.find().select("-password -refreshToken");
        if (!moderators) {
            return res.status(200).json(new ApiResponse(200, {}, "Moderator Is Not Available"));
        }

        return res.status(200).json(new ApiResponse(200, {}, "Moderator Fetching Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching Moderator's"));
    }
});

export { registerModerator, deleteModerator, listModerator };
