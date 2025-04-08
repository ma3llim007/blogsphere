import rateLimit from "express-rate-limit";
import { ApiError } from "../utils/Api.utils.js";

const publicLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minutes
    max: 100,
    handler: (_, res) => {
        return res.status(429).json(new ApiError(429, null, "Too Many Requests Form This IP, Please Try Again Later."));
    },
});

// Stricter limiter for authentication routes
const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 Minutes
    max: 30,
    handler: (_, res) => {
        return res.status(429).json(new ApiError(429, null, "Too Many Requests Form This Ip, Please Try Again Later."));
    },
});

export { publicLimiter, authLimiter };
