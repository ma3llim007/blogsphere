const WRITER_BLOG_STATUSES = Object.freeze(["Draft", "Ready To Publish"]);
const BLOG_STATUSES = Object.freeze(["Draft", "Ready To Publish", "Pending Review", "Needs Revisions", "Approved", "Rejected"]);

const writerBlogOptions = [
    { _id: "Draft", label: "Draft" },
    { _id: "Ready To Publish", label: "Ready To Publish" },
];

const moderatorBlogOptions = [
    { _id: "Needs Revisions", label: "Needs Revisions" },
    { _id: "Approved", label: "Approved" },
    { _id: "Rejected", label: "Rejected" },
];

const allBlogOptions = [
    { _id: "Draft", label: "Draft" },
    { _id: "Ready To Publish", label: "Ready To Publish" },
    { _id: "Needs Revisions", label: "Needs Revisions" },
    { _id: "Approved", label: "Approved" },
    { _id: "Rejected", label: "Rejected" },
];

const statusBlogClass = {
    Draft: "Secondary",
    "Ready To Publish": "Info",
    "Pending Review": "Warning",
    "Needs Revisions": "Danger",
    Approved: "Success",
    Rejected: "Danger",
};

const getStatusColor = status => {
    const colors = {
        Draft: "#9CA3AF", // Gray
        "Ready To Publish": "#FACC15", // Yellow
        "Needs Revisions": "#F97316", // Orange
        Approved: "#22C55E", // Green
        Rejected: "#EF4444", // Red
    };
    return colors[status] || "#3b82f6"; // Default Blue
};

export { WRITER_BLOG_STATUSES, BLOG_STATUSES, writerBlogOptions, statusBlogClass, moderatorBlogOptions, allBlogOptions, getStatusColor };
