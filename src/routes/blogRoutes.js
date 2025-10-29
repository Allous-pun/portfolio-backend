import express from "express";
import {
  getBlogs,
  getBlogBySlug,
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getBlogs);

// Admin routes (must come before slug route!)
router.get("/admin/all", protect, admin, getAllBlogs);
router.post("/", protect, admin, createBlog);
router.put("/:slug", protect, admin, updateBlog);
router.delete("/:slug", protect, admin, deleteBlog);

// Public — view blog by slug
router.get("/:slug", getBlogBySlug);

export default router;
