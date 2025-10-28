import express from "express";
import { createProfile, updateProfile, uploadAvatar } from "../controllers/profileController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/:userId", createProfile);        // ➕ Create profile
router.put("/:userId", updateProfile);         // ✏️ Update fields
router.post("/:userId/avatar", upload.single("avatar"), uploadAvatar); // 🖼️ Avatar upload

export default router;
