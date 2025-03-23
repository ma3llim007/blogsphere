import { Router } from "express";
import { addBlog, blogs, deleteBlog, editBlog, getBlog, getOptionsCategory } from "../../controllers/writer/blog.controller.js";
import { upload } from "../../middlewares/multer.middleware.js";
import authenticateAndVerifyWriter from "../../middlewares/authenticateAndVerifyWriter.js";

const router = Router();
router.use(authenticateAndVerifyWriter);

// Routes
router.route("/options-category").get(getOptionsCategory);
router.route("/add-blog").post(
    upload.fields([
        { name: "blogFeatureImage", maxCount: 1 },
        { name: "blogDetailImage", maxCount: 1 },
    ]),
    addBlog
);
router.route("/blogs").get(blogs);
router.route("/edit-blog").patch(
    upload.fields([
        { name: "blogFeatureImage", maxCount: 1 },
        { name: "blogDetailImage", maxCount: 1 },
    ]),
    editBlog
);
router.route("/delete-blog/:blogId").delete(deleteBlog);
router.route("/blog/:blogId").get(getBlog);

export default router;
