import express from "express";
import { getUserProfile,getUserById,searchUsers } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getUserProfile);
// router.get("/profile/:id", getUserProfile);
router.get("/profile/user/search", searchUsers);
router.get("/profile/user/:id", getUserById);

export default router;
