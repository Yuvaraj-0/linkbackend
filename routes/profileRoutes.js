import express from "express";
import {
  createProfile,
  getProfileById,
  updateProfile,
  deleteProfile,
} from "../controllers/profileController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createProfile);
router.get("/:id", verifyToken, getProfileById);
router.put("/", verifyToken, updateProfile);
router.delete("/", verifyToken, deleteProfile);

export default router;
