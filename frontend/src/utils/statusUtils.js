const WRITER_BLOG_STATUSES = Object.freeze(["Draft", "Ready To Publish"]);
const BLOG_STATUSES = Object.freeze(["Draft", "Ready To Publish", "Pending Review", "Needs Revisions", "Approved", "Rejected"]);

const writerBlogOptions = [
    { _id: "Draft", label: "Draft" },
    { _id: "Ready To Publish", label: "Ready To Publish" },
];

export { WRITER_BLOG_STATUSES, BLOG_STATUSES, writerBlogOptions };
