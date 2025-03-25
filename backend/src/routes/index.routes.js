import { Router } from "express";
// Admin Router
import admin_authRouter from "./admin/auth.routes.js";
import admin_categoryRouter from "./admin/category.routes.js";
import admin_blogRouter from "./admin/blog.routes.js";
import admin_moderatorRouter from "./admin/moderator.routes.js";
import admin_writerRouter from "./admin/writeAuth.routes.js";
// Moderator Router
import moderator_AuthRouter from "./moderator/auth.routes.js";
import moderator_blogRouter from "./moderator/blog.routes.js";
// Writer Router
import writer_AuthRouter from "./writer/auth.routes.js";
import writer_BlogRouter from "./writer/blog.routes.js";

// Admin Routes
const adminRoutes = Router();
adminRoutes.use("/auth", admin_authRouter);
adminRoutes.use("/category", admin_categoryRouter);
adminRoutes.use("/blog", admin_blogRouter);
adminRoutes.use("/moderator", admin_moderatorRouter);
adminRoutes.use("/writer", admin_writerRouter);

// Moderator Routes
const moderatorRoutes = Router();
moderatorRoutes.use("/auth", moderator_AuthRouter);
moderatorRoutes.use("/blog", moderator_blogRouter);

// Writer Routes
const writerRoutes = Router();
writerRoutes.use("/auth", writer_AuthRouter);
writerRoutes.use("/blog", writer_BlogRouter);

export { adminRoutes, writerRoutes, moderatorRoutes };
