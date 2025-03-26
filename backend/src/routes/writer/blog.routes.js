import { Router } from "express";
import { addBlog, blogs, deleteBlog, draftBlogs, editBlog, getBlog, getOptionsCategory, needsRevisionBlogs } from "../../controllers/writer/blog.controller.js";
import { upload } from "../../middlewares/multer.middleware.js";
import authenticateAndVerifyWriter from "../../middlewares/authenticateAndVerifyWriter.js";

const router = Router();
router.use(authenticateAndVerifyWriter);

// Routes
router.route("/options-category").get(getOptionsCategory);
router.route("/add-blog").post(upload.single("blogFeatureImage"), addBlog);
router.route("/blogs").get(blogs);
router.route("/draft-blogs").get(draftBlogs);
router.route("/need-revisions-blogs").get(needsRevisionBlogs);
router.route("/edit-blog").patch(upload.single("blogFeatureImage"), editBlog);
router.route("/delete-blog/:blogId").delete(deleteBlog);
router.route("/blog/:blogId").get(getBlog);

export default router;
