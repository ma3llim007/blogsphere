import { Router } from "express";
import authenticateAndVerifyAdmin from "../../middlewares/admin/authenticateAndVerifyAdmin.js";
import { upload } from "../../middlewares/multer.middleware.js";
import { addBlog, blogs, deleteBlog, editBlog, getBlog } from "../../controllers/admin/blog.controller.js";

const router = Router();
router.use(authenticateAndVerifyAdmin);

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
