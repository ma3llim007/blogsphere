import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";
import { Writer } from "../../models/writer.model.js";
import { HttpOptions } from "../../utils/utils.js";

// Generating Access And Refresh Token
const generateAccessAndRefreshTokensWriter = async (writerId) => {
    try {
        const writer = await Writer.findById(writerId);
        const accessToken = writer.generateAccessToken();
        const refreshToken = writer.generateRefreshToken();

        writer.refreshToken = refreshToken;
        await writer.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (_error) {
        throw new ApiError(500, "Something Went Wrong While Generating Refresh And Access Token");
    }
};

// Login Writer
const loginWriter = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
        return res.status(422).json(new ApiError(422, "Both Field Are Required"));
    }

    const writerIsExisted = await Writer.findOne({ email });
    if (!writerIsExisted) {
        return res.status(404).json(new ApiError(404, "Writer Not Found"));
    }

    const isPasswordValid = await writerIsExisted.isPasswordCorrect(password);
    if (!isPasswordValid) {
        return res.status(401).json(new ApiError(401, "Incorrect Password. Please Try Again."));
    }

    if (!writerIsExisted.writerVerify) {
        return res.status(403).json(new ApiError(403, "Access Denied. Your Account Is Not Active. Please Wait Un-Till Admin Verify You."));
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokensWriter(writerIsExisted?._id);
    const writer = writerIsExisted.toObject();
    delete writer.password;
    delete writer.refreshToken;

    return res
        .status(200)
        .cookie("accessToken", accessToken, HttpOptions)
        .cookie("refreshToken", refreshToken, HttpOptions)
        .json(new ApiResponse(200, writer, "Admin Logged In Successfully"));
});

// Change Password
const changePasswordWriter = asyncHandler(async (req, res) => {});

// update details
const updateDetailsWriter = asyncHandler(async (req, res) => {});

// Logout Writer
const logoutWriter = asyncHandler(async (req, res) => {
    if (!req.writer || !req.writer._id) {
        return res.status(400).json(new ApiError(400, "Writer Not Authenticated"));
    }
    await Writer.findByIdAndUpdate(
        req.writer._id,
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
        .json(new ApiResponse(200, {}, "Writer Logged Out"));
});

export { loginWriter, logoutWriter, generateAccessAndRefreshTokensWriter };
