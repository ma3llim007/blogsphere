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

export { HttpOptions, isTokenExpired };
