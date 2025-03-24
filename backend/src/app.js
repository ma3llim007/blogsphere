import express from "express";
import morgan from "morgan";
import cors from "cors";
import { adminRoutes, moderatorRoutes, writerRoutes } from "./routes/index.routes.js";
import cookieParser from "cookie-parser";
const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/writer", writerRoutes);
app.use("/api/v1/moderator", moderatorRoutes);

export default app;
