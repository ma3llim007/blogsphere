import mongoose, { Schema } from "mongoose";
const writerScheme = new Schema(
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
        writerVerify: {
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

export const Writer = mongoose.model("Writer", writerScheme);
