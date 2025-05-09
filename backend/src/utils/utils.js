import jwt from "jsonwebtoken";

// HTTP OPTIONS
const HttpOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
};
const isTokenExpired = (token) => {
    try {
        const decoded = jwt.decode(token);
        const now = Date.now() / 1000; // Get current time in seconds
        return decoded.exp < now; // Check if token has expired
    } catch (_error) {
        return true; // If decoding fails, consider the token expired
    }
};

const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => jwt.verify(token, secret, (err, decoded) => (err ? reject(err) : resolve(decoded))));
};

const generateCacheKey = (req) => {
    const baseUrl = req.path.replace(/^\/+|\/+$/g, "").replace(/\//g, ":");
    const params = req.query;
    const sortedParams = Object.keys(params)
        .sort()
        .map((key) => `${key}=${params[key]}`)
        .join("&");

    return sortedParams ? `${baseUrl}:${sortedParams}` : baseUrl;
};

export { HttpOptions, isTokenExpired, verifyToken, generateCacheKey };
