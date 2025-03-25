import { Moderator } from "../../models/moderator.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";
import { HttpOptions, verifyToken } from "../../utils/utils.js";
import bcrypt from "bcrypt";

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

// Login Moderator
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

    const moderator = moderatorIsExisted.toObject();
    delete moderator.password;
    delete moderator.refreshToken;
    return res
        .status(200)
        .cookie("accessToken", accessToken, HttpOptions)
        .cookie("refreshToken", refreshToken, HttpOptions)
        .json(new ApiResponse(200, moderator, "Moderator Logged In Successfully"));
});

// LogOut Moderator
const logOutModerator = asyncHandler(async (req, res) => {
    if (!req.moderator || !req.moderator._id) {
        return res.status(400).json(new ApiError(400, "Moderator Not Authenticated"));
    }
    await Moderator.findByIdAndUpdate(
        req.moderator._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );
    return res
        .status(200)
        .clearCookie("accessToken", HttpOptions)
        .clearCookie("refreshToken", HttpOptions)
        .json(new ApiResponse(200, {}, "Moderator Logged Out"));
});

// Get Moderator Details
const getModerator = asyncHandler(async (req, res) => {
    try {
        if (!req.moderator || !req.moderator._id) {
            return res.status(400).json(new ApiError(400, "Moderator Not Authenticated"));
        }
        const moderatorId = req.moderator._id;

        const moderator = await Moderator.findById({ _id: moderatorId }).select("-password -refreshToken -verifyBy -moderatorVerify").lean();
        if (!moderator) {
            return res.status(404).json(new ApiError(404, "Moderator Not Found"));
        }

        return res.status(200).json(new ApiResponse(200, moderator, "Moderator Details Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching Moderator Detail"));
    }
});
const changePasswordModerator = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { email } = req.moderator;

    if (!req.moderator || !req.moderator._id) {
        return res.status(400).json(new ApiError(400, "Moderator Not Authenticated"));
    }

    if (!password?.trim()) {
        return res.status(422).json(new ApiError(422, "Password Field Is Required"));
    }

    const moderatorIsExisted = await Moderator.findOne({ email });
    if (!moderatorIsExisted) {
        return res.status(404).json(new ApiError(404, "Moderator Not Found"));
    }

    const isSamePassword = await bcrypt.compare(password, moderatorIsExisted.password);
    if (isSamePassword) {
        return res.status(400).json(new ApiError(400, "New Password Cannot Be The Same As The Current Password"));
    }
    moderatorIsExisted.password = password;
    await moderatorIsExisted.save();

    return res
        .status(200)
        .clearCookie("accessToken", HttpOptions)
        .clearCookie("refreshToken", HttpOptions)
        .json(new ApiResponse(200, {}, "Password Change Successfully"));
});

const updateDetailsModerator = asyncHandler(async (req, res) => {
    if (!req.moderator || !req.moderator._id) {
        return res.status(400).json(new ApiError(400, "Moderator Not Authenticated"));
    }
    const { firstName, lastName, email, username, phoneNumber } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !username || !phoneNumber) {
        return res.status(400).json(new ApiError(400, "All Fields Are Required"));
    }

    try {
        const moderator = await Moderator.findById(req.moderator._id);
        if (!moderator) {
            return res.status(404).json(new ApiError(404, "Writer Not Found"));
        }

        // Check IF the email or username already Exists of another writer
        const existedWriter = await Moderator.findOne({ $or: [{ username }, { email }], _id: { $ne: req.moderator._id } });
        if (existedWriter) {
            return res.status(400).json(new ApiError(400, "Email Or Username Is Already In Use By Another Moderator"));
        }

        // Update Writer Details
        moderator.firstName = firstName;
        moderator.lastName = lastName;
        moderator.email = email;
        moderator.username = username;
        moderator.phoneNumber = phoneNumber;

        await moderator.save();

        return res.status(200).json(new ApiResponse(200, {}, "Moderator Details Updated Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Updating Moderator Details"));
    }
});

// Check session
const checkSession = asyncHandler(async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json(new ApiError(401, "Access Token Is Required"));
    }
    try {
        const admin = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);

        return res.status(200).json(new ApiResponse(200, { isAuthenticated: true, admin }, "Moderator AccessToken Verified Successfully"));
    } catch (_error) {
        return res.status(403).json(new ApiError(403, "Access Token Is Not Valid"));
    }
});

export { loginModerator, changePasswordModerator, updateDetailsModerator, checkSession, generateAccessAndRefreshTokensModerator, logOutModerator, getModerator };
