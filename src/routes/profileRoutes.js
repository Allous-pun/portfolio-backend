import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getPublicProfile,
  createOrUpdateProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profileController.js";

const router = express.Router();

// ✅ PUBLIC — Anyone can GET your profile (no token required)
router.get("/", getPublicProfile);

// ✅ PRIVATE — Only you can modify profile
router.post("/", protect, createOrUpdateProfile);
router.put("/", protect, updateProfile);
router.delete("/", protect, deleteProfile);

export default router;
