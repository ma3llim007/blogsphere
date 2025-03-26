import { Router } from "express";
import { addBlog, approvedBlogs, blogs, deleteBlog, draftBlogs, editBlog, getBlog, getOptionsCategory, needsRevisionBlogs, pendingBlogs } from "../../controllers/writer/blog.controller.js";
import { upload } from "../../middlewares/multer.middleware.js";
import authenticateAndVerifyWriter from "../../middlewares/authenticateAndVerifyWriter.js";

const router = Router();
router.use(authenticateAndVerifyWriter);

// Routes
router.route("/options-category").get(getOptionsCategory);
router.route("/add-blog").post(upload.single("blogFeatureImage"), addBlog);
router.route("/blogs").get(blogs);
router.route("/draft-blogs").get(draftBlogs);
router.route("/pending-blogs").get(pendingBlogs);
router.route("/approved-blogs").get(approvedBlogs);
router.route("/need-revisions-blogs").get(needsRevisionBlogs);
router.route("/edit-blog").patch(upload.single("blogFeatureImage"), editBlog);
router.route("/delete-blog/:blogId").delete(deleteBlog);
router.route("/blog/:blogId").get(getBlog);

export default router;
