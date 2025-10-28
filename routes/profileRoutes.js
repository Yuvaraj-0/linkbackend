import express from "express";
import {
  createProfile,
  getProfileById,
  updateProfile,
  deleteProfile,
} from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",protect, createProfile);
router.get("/:id", protect, getProfileById);
router.put("/", protect, updateProfile);
router.delete("/", protect, deleteProfile);

export default router;
