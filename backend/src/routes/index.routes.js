import { Router } from "express";
// Admin Router
import authRouter from "./admin/auth.routes.js";
import categoryRouter from "./admin/category.routes.js";
import blogRouter from "./admin/blog.routes.js";
import moderatorRouter from "./admin/moderator.routes.js";
import writerRouter from "./admin/writeAuth.routes.js";
// Moderator Router
import moderatorAuthRouter from "./moderator/auth.routes.js";
// Writer Router
import writerAuthRouter from "./writer/auth.routes.js";
import writerBlogRouter from "./writer/blog.routes.js";

// Admin Routes
const adminRoutes = Router();
adminRoutes.use("/auth", authRouter);
adminRoutes.use("/category", categoryRouter);
adminRoutes.use("/blog", blogRouter);
adminRoutes.use("/moderator", moderatorRouter);
adminRoutes.use("/writer", writerRouter);

// Moderator Routes
const moderatorRoutes = Router();
moderatorRouter.route("/auth", moderatorAuthRouter);

// Writer Routes
const writerRoutes = Router();
writerRoutes.use("/auth", writerAuthRouter);
writerRoutes.use("/blog", writerBlogRouter);

export { adminRoutes, writerRoutes, moderatorRoutes };
