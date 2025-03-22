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

const capitalizeWords = str => {
    return str
        ?.trim()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
};

export { formatDateTime, currentYear, capitalizeWords };
