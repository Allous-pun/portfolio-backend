import express from "express";
import {
  createContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getContacts)
  .post(createContact);

router.route("/:id")
  .put(protect, updateContactStatus)
  .delete(protect, deleteContact);

export default router;
