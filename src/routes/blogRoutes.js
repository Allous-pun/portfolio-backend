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
router.get("/:slug", getBlogBySlug);

// Admin routes
router.get("/admin/all", protect, admin, getAllBlogs);
router.post("/", protect, admin, createBlog);
router.put("/:slug", protect, admin, updateBlog);
router.delete("/:slug", protect, admin, deleteBlog);

export default router;
