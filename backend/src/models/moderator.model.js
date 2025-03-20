import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const moderatorScheme = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "First Name Is Required"],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "Last Name Is Required"],
            trim: true,
        },
        username: {
            type: String,
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email Is Required"],
            lowercase: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password Is Required"],
        },
        refreshToken: {
            type: String,
        },
        moderatorVerify: {
            type: Boolean,
            default: false,
        },
        verifyBy: {
            type: Schema.Types.ObjectId,
            ref: "admin",
        },
    },
    { timestamps: true }
);

// Hashing The Password
moderatorScheme.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
        next(error);
    }
    return next();
});

// Checking The Password Is Correct Or Not
moderatorScheme.methods.isCorrectPassword = async (password) => {
    return await bcrypt.compare(password, this.password);
};

// Generate Access Token
moderatorScheme.methods.generateAccessToken = () => {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

// Generate Refresh Token
moderatorScheme.methods.generateRefreshToken = () => {
    return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
};

export const Moderator = model("Moderator", moderatorScheme);
