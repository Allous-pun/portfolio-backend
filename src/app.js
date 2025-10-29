// src/app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Utils & Middleware
import { logger } from "./utils/logger.js";      // ✅ added
import errorHandler from "./middleware/errorHandler.js"; // ✅ added

// Route Imports
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Morgan logs to console (dev mode only)
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Root Health Check
app.get("/", (req, res) => {
  logger.info("Root endpoint accessed ✅"); // ✅ logged using logger
  res.json({ message: "Portfolio backend is running 🚀" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/blogs", blogRoutes);

// Global 404 Route
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ✅ Global Error Handler Should Always Be Last
app.use(errorHandler);

export default app;
