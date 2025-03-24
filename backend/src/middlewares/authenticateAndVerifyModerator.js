import { generateAccessAndRefreshTokensWriter } from "../controllers/writer/auth.controller.js";
import { Moderator } from "../models/moderator.model.js";
import { ApiError, asyncHandler } from "../utils/Api.utils.js";
import { HttpOptions, isTokenExpired } from "../utils/utils.js";
import jwt from "jsonwebtoken";

const authenticateAndVerifyModerator = asyncHandler(async (req, res, next) => {
    try {
        let accessToken = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        const refreshToken = req.cookies.refreshToken;

        // If No Access Token, Try Refreshing It
        if (!accessToken || isTokenExpired(accessToken)) {
            if (!refreshToken) {
                return res.status(401).json(new ApiError(401, "Refresh Token Missing. Please Log In Again."));
            }

            // Decode Refresh Token
            const decodedToken = jwt.decode(refreshToken);
            if (!decodedToken?._id) {
                return res.status(401).json(new ApiError(401, "Invalid Refresh Token."));
            }

            // Generate New Tokens
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokensWriter(decodedToken?._id);

            // Set New Tokens In Cookies
            res.cookie("accessToken", newAccessToken, HttpOptions);
            res.cookie("refreshToken", newRefreshToken, HttpOptions);

            // Use the new access token for further verification
            accessToken = newAccessToken;
        }

        // Verify and decode access token
        const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (!decodedAccessToken?._id) {
            return res.status(401).json(new ApiError(401, "Invalid Access Token."));
        }

        // Fetching Moderator Details
        const moderator = await Moderator.findById(decodedAccessToken._id).select("-password -refreshToken").lean();
        if (!moderator) {
            return res.status(401).json(new ApiError(401, "Moderator Not Found"));
        }
        if (!moderator.moderatorVerify) {
            return res.status(403).json(new ApiError(403, "Access Denied. Your Account Is Not Active. Please Wait Un-Till Admin Verify You."));
        }

        req.moderator = moderator;
        next();
    } catch (error) {
        const errorMessage = error.name === "TokenExpiredError" ? "Access Token Expired" : error?.message || "Invalid Access Token";
        return res.status(401).json(new ApiError(401, errorMessage));
    }
});

export default authenticateAndVerifyModerator;
