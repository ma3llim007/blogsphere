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

export { WRITER_BLOG_STATUSES, BLOG_STATUSES, writerBlogOptions, statusBlogClass, moderatorBlogOptions, allBlogOptions };
