import { Moderator } from "../../models/moderator.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";
import { HttpOptions } from "../../utils/utils.js";

// Generating Access And Refresh Token
const generateAccessAndRefreshTokensModerator = async (moderatorId) => {
    try {
        const moderator = await Moderator.findById(moderatorId);
        const accessToken = moderator.generateAccessToken();
        const refreshToken = moderator.generateRefreshToken();
        
        moderator.refreshToken = refreshToken;
        await moderator.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (_error) {
        throw new ApiError(500, "Something Went Wrong While Generating Refresh And Access Token");
    }
};

const loginModerator = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email?.trim() || !password?.trim()) {
        return res.status(422).json(new ApiError(422, "Both Field Are Required"));
    }

    const moderatorIsExisted = await Moderator.findOne({ email });
    if (!moderatorIsExisted) {
        return res.status(404).json(new ApiError(404, "Moderator Not Found"));
    }

    const isPasswordValid = await moderatorIsExisted.isCorrectPassword(password);
    if (!isPasswordValid) {
        return res.status(401).json(new ApiError(401, "Incorrect Password. Please Try Again."));
    }

    if (!moderatorIsExisted.moderatorVerify) {
        return res.status(403).json(new ApiError(403, "Access Denied. Your Account Is Not Active. Please Wait Un-Till Admin Verify You."));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokensModerator(moderatorIsExisted?._id);

    return res
        .status(200)
        .cookie("accessToken", accessToken, HttpOptions)
        .cookie("refreshToken", refreshToken, HttpOptions)
        .json(new ApiResponse(200, {}, "Moderator Logged In Successfully"));
});

const changePasswordModerator = asyncHandler(async (req, res) => {});
const updateDetailsModerator = asyncHandler(async (req, res) => {});

export { loginModerator, changePasswordModerator, updateDetailsModerator };
