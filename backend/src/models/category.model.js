import { model, Schema } from "mongoose";

const categoryScheme = new Schema(
    {
        categoryName: {
            type: String,
            required: [true, "Category Name Is Required"],
            lowercase: true,
            trim: true,
            unique: true,
        },
        categorySlug: {
            type: String,
            required: [true, "Category Slug Is Required"],
            lowercase: true,
            trim: true,
            unique: true,
        },
        categoryImage: {
            type: String,
            required: [true, "Category Image Is Required"],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export const Category = model("Category", categoryScheme);
