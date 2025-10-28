import express from "express";
import { createPost, getAllPosts,toggleLike,getPostById,
    addComment,
    getComments,getPostsByUser ,
    updatePost,
    deletePost,} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";
const router = express.Router();

router.post("/post", protect, createPost);
// router.get("/get", protect, getUserPosts);
router.put("/:id/like", protect, toggleLike); // ❤️ like/unlike
router.post("/:id/comment", protect, addComment); // 💬 add comment
router.get("/:id/comments", protect, getComments); // 💬 get comments
//cloud
router.post("/postc", protect, upload.single("image"), createPost);

router.get("/user/:userId", getPostsByUser);
router.get("/get", getAllPosts);               // Get all posts
router.get("/:id", getPostById);            // Get single post by ID
router.put("/:id", protect, updatePost);

// 🗑️ Delete post
router.delete("/:id", protect, deletePost);
export default router;
