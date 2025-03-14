import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import { HttpOptions, isTokenExpired } from "../../utils/utils.js";
import jwt from "jsonwebtoken";
import { generateAccessAndRefreshTokensAdmin } from "../../controllers/admin/auth.controller.js";
import { Admin } from "../../models/admin.model.js";

const authenticateAndVerifyAdmin = asyncHandler(async (req, res, next) => {
    try {
        let accessToken = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        const refreshToken = req.cookies.refreshToken;

        // If no access token, try refreshing it
        if (!accessToken || isTokenExpired(accessToken)) {
            if (!refreshToken) {
                return res.status(401).json(new ApiError(401, "Refresh Token Missing. Please Log In Again."));
            }

            // Decode refresh token
            const decodedToken = jwt.decode(refreshToken);
            if (!decodedToken?._id) {
                return res.status(401).json(new ApiError(401, "Invalid Refresh Token."));
            }

            // Generate New Tokens
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokensAdmin(decodedToken._id);

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

        // Fetch Admin Details
        const admin = await Admin.findById(decodedAccessToken._id).select("-password -refreshToken");
        if (!admin) {
            return res.status(401).json(new ApiError(401, "Admin Not Found"));
        }

        if (!admin.isActive) {
            return res.status(403).json(new ApiError(403, "Access Denied. Your Account is Inactive."));
        }

        if (!admin.asOwnerShip) {
            return res.status(403).json(new ApiError(403, "Access Denied. Admin Panel Access Restricted."));
        }

        req.admin = admin;
        next();
    } catch (error) {
        const errorMessage = error.name === "TokenExpiredError" ? "Access Token Expired" : error?.message || "Invalid Access Token";
        return res.status(401).json(new ApiError(401, errorMessage));
    }
});

export default authenticateAndVerifyAdmin;
