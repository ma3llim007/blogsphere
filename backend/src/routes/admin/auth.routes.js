import { Router } from "express";
import { loginAdmin, logOutAdmin, registerAdmin, changePassword, checkSession } from "../../controllers/admin/auth.controller.js";
import authenticateAndVerifyAdmin from "../../middlewares/admin/authenticateAndVerifyAdmin.js";

const router = Router();

// Router
router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);
router.route("/logout").post(authenticateAndVerifyAdmin, logOutAdmin);
router.route("/change-password").post(authenticateAndVerifyAdmin, changePassword);
router.route("/check-session").get(authenticateAndVerifyAdmin, checkSession);

export default router;
