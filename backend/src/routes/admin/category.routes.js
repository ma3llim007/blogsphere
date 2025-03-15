import { Router } from "express";
import authenticateAndVerifyAdmin from "../../middlewares/admin/authenticateAndVerifyAdmin.js";
import { upload } from "../../middlewares/multer.middleware.js";
import { addCategory, categories, deleteCategory, getCategoryById, getOptionsCategory, updateCategory } from "../../controllers/admin/category.controller.js";

const router = Router();
router.use(authenticateAndVerifyAdmin);

// Router
router.route("/add-category").post(upload.single("categoryImage"), addCategory);
router.route("/categories").get(categories);
router.route("/update-category/").patch(upload.single("categoryImage"), updateCategory);
router.route("/delete-category/:categoryId").delete(deleteCategory);
router.route("/get-category/:categoryId").get(getCategoryById);
router.route("/options-category").get(getOptionsCategory);

export default router;
