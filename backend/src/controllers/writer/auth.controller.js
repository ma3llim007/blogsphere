import { ApiError, ApiResponse, asyncHandler } from "../../utils/Api.utils.js";
import { Writer } from "../../models/writer.model.js";
import { HttpOptions, verifyToken } from "../../utils/utils.js";
import bcrypt from "bcrypt";

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
        .json(new ApiResponse(200, writer, "Writer Logged In Successfully"));
});

// Change Password
const changePasswordWriter = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { email } = req.writer;

    if (!req.writer || !req.writer._id) {
        return res.status(400).json(new ApiError(400, "Writer Not Authenticated"));
    }

    if (!password?.trim()) {
        return res.status(422).json(new ApiError(422, "Password Field Is Required"));
    }

    const writerIsExisted = await Writer.findOne({ email });
    if (!writerIsExisted) {
        return res.status(404).json(new ApiError(404, "Writer Not Found"));
    }

    const isSamePassword = await bcrypt.compare(password, writerIsExisted.password);
    if (isSamePassword) {
        return res.status(400).json(new ApiError(400, "New Password Cannot Be The Same As The Current Password"));
    }

    writerIsExisted.password = password;
    await writerIsExisted.save();

    return res
        .status(200)
        .clearCookie("accessToken", HttpOptions)
        .clearCookie("refreshToken", HttpOptions)
        .json(new ApiResponse(200, {}, "Password Change Successfully"));
});

// update details
const updateDetailsWriter = asyncHandler(async (req, res) => {
    if (!req.writer || !req.writer._id) {
        return res.status(400).json(new ApiError(400, "Writer Not Authenticated"));
    }
    const { firstName, lastName, email, username, phoneNumber } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !username || !phoneNumber) {
        return res.status(400).json(new ApiError(400, "All Fields Are Required"));
    }

    try {
        const writer = await Writer.findById(req.writer._id);
        if (!writer) {
            return res.status(404).json(new ApiError(404, "Writer Not Found"));
        }

        // Check IF the email or username already Exists of another writer
        const existedWriter = await Writer.findOne({ $or: [{ username }, { email }], _id: { $ne: req.writer._id } });
        if (existedWriter) {
            return res.status(400).json(new ApiError(400, "Email Or Username Is Already In Use By Another Writer"));
        }

        // Update Writer Details
        writer.firstName = firstName;
        writer.lastName = lastName;
        writer.email = email;
        writer.username = username;
        writer.phoneNumber = phoneNumber;

        await writer.save();

        return res.status(200).json(new ApiResponse(200, {}, "Writer Details Updated Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Updateing Writer Details"));
    }
});

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

// Get Writer Details
const getWriter = asyncHandler(async (req, res) => {
    try {
        if (!req.writer || !req.writer._id) {
            return res.status(400).json(new ApiError(400, "Writer Not Authenticated"));
        }
        const writerId = req.writer._id;

        const writer = await Writer.findById({ _id: writerId }).select("-password -refreshToken -verifyBy -writerVerify").lean();
        if (!writer) {
            return res.status(404).json(new ApiError(404, "Writer Not Found"));
        }

        return res.status(200).json(new ApiResponse(200, writer, "Writer Details Fetch Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong! While Fetching Writer Detail"));
    }
});

// Check Session
const checkSessionWriter = asyncHandler(async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json(new ApiError(401, "Access Token Is Required"));
    }
    try {
        const admin = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);

        return res.status(200).json(new ApiResponse(200, { isAuthenticated: true, admin }, "Writer AccessToken Verified Successfully"));
    } catch (_error) {
        return res.status(403).json(new ApiError(403, "Access Token Is Not Valid"));
    }
});

export { loginWriter, logoutWriter, generateAccessAndRefreshTokensWriter, getWriter, checkSessionWriter, updateDetailsWriter, changePasswordWriter };
