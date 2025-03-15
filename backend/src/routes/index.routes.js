import { Router } from "express";
import authRouter from "./admin/auth.routes.js";
import categoryRouter from "./admin/category.routes.js";

// Admin Routes
const adminRoutes = Router();
adminRoutes.use("/auth", authRouter);
adminRoutes.use("/category", categoryRouter);

export { adminRoutes };
