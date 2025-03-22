import { Router } from "express";
import authRouter from "./admin/auth.routes.js";
import categoryRouter from "./admin/category.routes.js";
import blogRouter from "./admin/blog.routes.js";
import moderatorRouter from "./admin/moderator.routes.js";
import writerRouter from "./admin/writeAuth.routes.js";

// Admin Routes
const adminRoutes = Router();
adminRoutes.use("/auth", authRouter);
adminRoutes.use("/category", categoryRouter);
adminRoutes.use("/blog", blogRouter);
adminRoutes.use("/moderator", moderatorRouter);
adminRoutes.use("/writer", writerRouter);

export { adminRoutes };
