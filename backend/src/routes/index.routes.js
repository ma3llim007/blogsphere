import { Router } from "express";
import authRouter from "./admin/auth.routes.js";

// Admin Routes
const adminRoutes = Router();
adminRoutes.use("/auth", authRouter);

export { adminRoutes };
