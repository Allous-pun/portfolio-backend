import express from "express";
import {
  getTestimonials,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getTestimonials); // Only approved testimonials visible
router.post("/", createTestimonial); // public submission

// Admin routes
router.get("/admin", protect, admin, getAllTestimonials);
router.put("/:id", protect, admin, updateTestimonial);
router.delete("/:id", protect, admin, deleteTestimonial);

export default router;
