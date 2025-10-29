// src/middleware/errorHandler.js
import { logger } from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: Object.values(err.errors).map((e) => e.message),
    });
  }

  // Duplicate field (e.g., duplicate email or slug)
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Duplicate key error — this value already exists",
    });
  }

  // Default fallback
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
};

export default errorHandler;
