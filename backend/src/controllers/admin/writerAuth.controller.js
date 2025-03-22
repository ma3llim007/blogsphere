import { isValidObjectId } from "mongoose";
import { Writer } from "../../models/writer.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";

// Register Writer
const registerWriter = asyncHandler(async (req, res) => {
    try {
        const { firstName, lastName, username, email, phoneNumber, password } = req.body;
        if (![firstName, lastName, username, email, phoneNumber, password].every((field) => field?.trim())) {
            return res.status(422).json(new ApiError(422, "All Field Are Required"));
        }

        const existedWriter = await Writer.findOne({ $or: [{ email }, { username }] });
        if (existedWriter) {
            return res.status(409).json(new ApiError(409, "E-Mail Or Username Is Already Exists"));
        }

        await Writer.create({
            firstName,
            lastName,
            username,
            email,
            phoneNumber,
            password,
        });

        return res.status(201).json(new ApiResponse(201, {}, "Writer Register Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Registering Writer"));
    }
});

// Delete Writer
const deleteWriter = asyncHandler(async (req, res) => {
    const { writerId } = req.params;

    if (!isValidObjectId(writerId)) {
        return res.status(422).json(new ApiError(422, "Invalid Writer ID."));
    }

    const writer = await Writer.findById(writerId);
    if (!writer) {
        return res.status(400).json(new ApiError(400, "Writer Not Found"));
    }

    const writerDelete = await Writer.deleteOne({ _id: writerId });

    if (writerDelete.deletedCount === 0) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Deleting Writer"));
    }

    return res.status(200).json(new ApiResponse(200, {}, "Writer Delete Successfully"));
});

// Writer Listing
const writerListing = asyncHandler(async (req, res) => {
    try {
        const writers = await Writer.find().select("-password -refreshToken").lean();
        if (!writers.length) {
            return res.status(200).json(new ApiResponse(200, {}, "Writer Is Not Available"));
        }

        return res.status(200).json(new ApiResponse(200, writers, "Writer Fetching Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching Writer's"));
    }
});

// View Writer
const viewWriter = asyncHandler(async (req, res) => {
    try {
        const { writerId } = req.params;

        if (!isValidObjectId(writerId)) {
            return res.status(422).json(new ApiError(422, "Invalid Writer ID."));
        }

        const writer = await Writer.findById(writerId).select("-password -refreshToken").lean();
        if (!writer) {
            return res.status(400).json(new ApiError(400, "Writer Is Not Found"));
        }

        return res.status(200).json(new ApiResponse(200, writer, "Writer Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching Writer"));
    }
});

// Verify Writer
const verifyWriter = asyncHandler(async (req, res) => {
    const adminId = req.admin?._id;
    try {
        const { writerId } = req.params;

        if (!isValidObjectId(writerId)) {
            return res.status(422).json(new ApiError(422, "Invalid Writer ID."));
        }

        const writer = await Writer.findById(writerId);
        if (!writer) {
            return res.status(400).json(new ApiError(400, "Writer Is Not Found"));
        }

        if (writer.writerVerify) {
            return res.status(404).json(new ApiError(404, "Writer Is Already Verify"));
        }
        writer.writerVerify = true;
        writer.verifyBy = adminId;
        await writer.save();

        return res.status(200).json(new ApiResponse(200, {}, "Writer Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Verify Writer"));
    }
});

export { registerWriter, writerListing, viewWriter, verifyWriter, deleteWriter };
