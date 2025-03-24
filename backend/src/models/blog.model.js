import { model, Schema } from "mongoose";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

const blogScheme = new Schema(
    {
        blogTitle: {
            type: String,
            required: [true, "Blog Title Is Required"],
            lowercase: true,
            trim: true,
        },
        blogSlug: {
            type: String,
            required: [true, "Blog Title Is Required"],
            lowercase: true,
            trim: true,
            unique: true,
        },
        blogFeatureImage: {
            type: String,
            required: [true, "Blog Feature Image Is Required"],
        },
        blogShortDescription: {
            type: String,
            required: [true, "Blog Short Description Is Required"],
        },
        blogDescription: {
            type: String,
            required: [true, "Blog Description Is Required"],
        },
        blogCategory: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Category Is Required"],
        },
        blogStatus: {
            type: String,
            enum: ["Draft", "Ready To Publish", "Pending Review", "Needs Revisions", "Approved", "Rejected"],
            default: "Draft",
        },
        blogAuthorId: {
            type: Schema.Types.ObjectId,
            ref: "Writer",
            required: [true, "Author Id Is Required"],
        },
        blogModeratorId: {
            type: Schema.Types.ObjectId,
            ref: "Moderator",
        },
        blogRevisionMessage: {
            type: String,
        },
        blogRejectedMessage: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Pre-Save Hook to sanitize HTML content before saving to the database
blogScheme.pre("save", function (next) {
    if (this.blogDescription) {
        this.blogDescription = purify.sanitize(this.blogDescription);
    }
    next();
});

export const Blog = model("Blog", blogScheme);
