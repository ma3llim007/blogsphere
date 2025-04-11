import express from "express";
import cors from "cors";
import { adminRoutes, clientRoutes, moderatorRoutes, writerRoutes } from "./routes/index.routes.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
    })
);
app.use(
    compression({
        threshold: 1024,
        level: 6,
        filter: (req, res) => {
            if (req.headers["x-no-compression"]) {
                return false;
            }
            return compression.filter(req, res);
        },
    })
);
// 🔐 Trust the proxy so that rate-limiter gets the real IP
app.use("trust proxy", true);

// Routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/writer", writerRoutes);
app.use("/api/v1/moderator", moderatorRoutes);
app.use("/api/v1/", clientRoutes);

export default app;
