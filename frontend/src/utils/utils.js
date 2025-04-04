const formatDateTime = inputDate => {
    const date = new Date(inputDate);
    return date.toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

const currentYear = () => {
    let date = new Date();
    return date.getFullYear();
};

const slugToText = str => {
    return str
        .trim()
        .replace(/-+/g, " ")
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
};

const capitalizeWords = str => {
    return str
        ?.trim()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
};

const validFileExtensions = ["image/jpg", "image/gif", "image/png", "image/jpeg", "image/svg", "image/webp"];

const isValidFileType = file => {
    // Check if fileType exists in validFileExtensions
    if (!file || !file.type) {
        console.warn("File or file type is missing.");
        return false;
    }

    const isValid = validFileExtensions.includes(file.type);
    if (!isValid) {
        return false;
    }

    return isValid;
};

const isValidExtensions = file => {
    const isValid = validFileExtensions.includes(file.type);

    if (!isValid) {
        return false;
    }

    return isValid;
};

const slugTransform = value => {
    if (value && typeof value === "string") {
        return value
            .trim()
            .toLowerCase()
            .replace(/[^\w\s-]/g, "") // Removes special characters except dashes
            .replace(/\s+/g, "-") // Replaces spaces with dashes
            .replace(/--+/g, "-") // Replaces multiple dashes with a single dash
            .replace(/^-+|-+$/g, ""); // Trims any leading or trailing dashes
    }
    return "";
};

export { formatDateTime, currentYear, capitalizeWords, isValidExtensions, isValidFileType, slugTransform, slugToText };
