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
const deleteModerator = asyncHandler(async (req, res) => {});

// List Moderator
const listModerator = asyncHandler(async (req, res) => {});

export { registerModerator, deleteModerator, listModerator };
