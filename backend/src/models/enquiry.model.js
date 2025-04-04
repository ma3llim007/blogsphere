import { model, Schema } from "mongoose";

const enquiryScheme = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name Is Required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email Is Required"],
            trim: true,
        },
        phoneNumber: {
            type: String,
            lowercase: true,
            trim: true,
        },
        subject: {
            type: String,
            trim: true,
        },
        message: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

export const Enquiry = model("Enquiry", enquiryScheme);
