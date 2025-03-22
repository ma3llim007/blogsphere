import { isValidObjectId } from "mongoose";
import { Moderator } from "../../models/moderator.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";

// Register Moderator
const registerModerator = asyncHandler(async (req, res) => {
    try {
        const { firstName, lastName, username, email, phoneNumber, password } = req.body;
        if (![firstName, lastName, username, email, phoneNumber, password].every((field) => field?.trim())) {
            return res.status(422).json(new ApiError(422, "All Field Are Required"));
        }

        const existedModerator = await Moderator.findOne({ $or: [{ email }, { username }] });
        if (existedModerator) {
            return res.status(409).json(new ApiError(409, "E-Mail Or Username Is Already Exists"));
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
        return res.status(422).json(new ApiError(422, "Invalid Moderator ID."));
    }

    const moderator = await Moderator.findById(moderatorId);
    if (!moderator) {
        return res.status(400).json(new ApiError(400, "Moderator Not Found"));
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
        const moderators = await Moderator.find().select("-password -refreshToken").lean();
        if (!moderators.length) {
            return res.status(200).json(new ApiResponse(200, {}, "Moderator Is Not Available"));
        }

        return res.status(200).json(new ApiResponse(200, moderators, "Moderator Fetching Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching Moderator's"));
    }
});

// Moderator By Moderator Id
const getModeratorById = asyncHandler(async (req, res) => {
    try {
        const { moderatorId } = req.params;

        if (!isValidObjectId(moderatorId)) {
            return res.status(422).json(new ApiError(422, "Invalid Moderator ID."));
        }

        const moderator = await Moderator.findById(moderatorId).select("-password -refreshToken").lean();
        if (!moderator) {
            return res.status(400).json(new ApiError(400, "Moderator Is Not Found"));
        }

        return res.status(200).json(new ApiResponse(200, moderator, "Moderator Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching Moderator"));
    }
});

// Verify Moderator By Moderator Id
const verifyModeratorById = asyncHandler(async (req, res) => {
    try {
        const { moderatorId } = req.params;

        if (!isValidObjectId(moderatorId)) {
            return res.status(422).json(new ApiError(422, "Invalid Moderator ID."));
        }

        const moderator = await Moderator.findById(moderatorId);
        if (!moderator) {
            return res.status(400).json(new ApiError(400, "Moderator Is Not Found"));
        }

        if (moderator.moderatorVerify) {
            return res.status(404).json(new ApiError(404, "Moderator Is Already Verify"));
        }
        moderator.moderatorVerify = true;

        await moderator.save();
        return res.status(200).json(new ApiResponse(200, {}, "Moderator Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Verify Moderator"));
    }
});

export { registerModerator, deleteModerator, listModerator, getModeratorById, verifyModeratorById };
