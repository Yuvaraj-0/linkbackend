import express from "express";
import multer from "multer";
import path from "path";
import { uploadAvatar, getUserAvatar } from "../controllers/avatarController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📂 Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/avatars/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error("Only JPG and PNG images are allowed"));
  },
});

// 🛣️ Routes
router.post("/upload", protect, upload.single("avatar"), uploadAvatar);
router.get("/:userId", getUserAvatar);

export default router;
