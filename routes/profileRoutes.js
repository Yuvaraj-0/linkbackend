import express from "express";
import {
  createProfile,
  getProfileById,
  updateProfile,
  deleteProfile,
} from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Use same pattern as frontend
router.post("/", protect, createProfile);
router.get("/:id", protect, getProfileById);
router.put("/:id", protect, updateProfile);
router.delete("/:id", protect, deleteProfile);

export default router;

