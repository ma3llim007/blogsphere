import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Uploading Image on Cloudinary
const uploadCloudinary = async (filePath, folderPath = "sameerblogs") => {
    if (!filePath) {
        return null;
    }

    try {
        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
            folder: folderPath,
        });
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return response;
    } catch (_error) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return null;
    }
};

// Removing Image From Cloudinary
const removeImage = async (folderPath, fileUrl) => {
    try {
        if (!folderPath || !fileUrl) {
            return null;
        }
        const publicId = `${folderPath}${fileUrl}`;
        const response = await cloudinary.uploader.destroy(publicId);
        return response;
    } catch (error) {
        console.error("Error While Removing Image From Cloudinary", error);
        return null;
    }
};

const extractPublicId = (imageUrl) => {
    const parts = imageUrl.split("/");
    const lastPart = parts.pop();
    return lastPart.split(".")[0];
};

export { uploadCloudinary, removeImage, extractPublicId };
