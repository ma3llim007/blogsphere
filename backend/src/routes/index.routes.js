import { Router } from "express";
// Admin Import
import admin_authRouter from "./admin/auth.routes.js";
import admin_categoryRouter from "./admin/category.routes.js";
import admin_blogRouter from "./admin/blog.routes.js";
import admin_moderatorRouter from "./admin/moderator.routes.js";
import admin_writerRouter from "./admin/writeAuth.routes.js";
import admin_enquiryRouter from "./admin/enquiry.routes.js";
// Moderator Import
import moderator_AuthRouter from "./moderator/auth.routes.js";
import moderator_blogRouter from "./moderator/blog.routes.js";
import moderator_dashboardRouter from "./moderator/dashboard.routes.js";
// Writer Import
import writer_AuthRouter from "./writer/auth.routes.js";
import writer_BlogRouter from "./writer/blog.routes.js";
import writer_dashboardRouter from "./writer/dashboard.routes.js";
// Client Import
import client_categoryRouter from "./client/category.routes.js";
import client_blogRouter from "./client/blog.routes.js";
import client_enquiryRouter from "./client/enquiry.routes.js";
import { authLimiter, publicLimiter } from "../middlewares/rate-limit.middleware.js";

// Admin Routes
const adminRoutes = Router();
adminRoutes.use("/auth", authLimiter, admin_authRouter);
adminRoutes.use("/category", admin_categoryRouter);
adminRoutes.use("/blog", admin_blogRouter);
adminRoutes.use("/moderator", admin_moderatorRouter);
adminRoutes.use("/writer", admin_writerRouter);
adminRoutes.use("/enquiry", admin_enquiryRouter);

// Moderator Routes
const moderatorRoutes = Router();
moderatorRoutes.use("/auth", authLimiter, moderator_AuthRouter);
moderatorRoutes.use("/blog", moderator_blogRouter);
moderatorRoutes.use("/dashboard", moderator_dashboardRouter);

// Writer Routes
const writerRoutes = Router();
writerRoutes.use("/auth", authLimiter, writer_AuthRouter);
writerRoutes.use("/blog", writer_BlogRouter);
writerRoutes.use("/dashboard", writer_dashboardRouter);

// Client Routes
const clientRoutes = Router();
clientRoutes.use("/category", publicLimiter, client_categoryRouter);
clientRoutes.use("/blog", publicLimiter, client_blogRouter);
clientRoutes.use("/enquiry", publicLimiter, client_enquiryRouter);

export { adminRoutes, writerRoutes, moderatorRoutes, clientRoutes };
