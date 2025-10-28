import Post from "../models/Post.js";
import cloudinary from "../config/cloudinary.js";




export const getPostsByUser = async (req, res) => {

    try {
      const userId = req.params.userId;
  
      const posts = await Post.find({ user: userId })
        .populate("user", "name email avatar")
        .sort({ createdAt: -1 });
  
      if (!posts.length) {
        return res.status(404).json({
          success: false,
          message: "No posts found for this user",
        });
      }
  
      res.status(200).json({
        
        success: true,
        posts,

        
      });
    } catch (error) {
      console.error("❌ Error fetching posts by user:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  };
  

export const createPost = async (req, res) => {
    
    try {
      console.log("📥 Incoming request body:", req.body);
      console.log("📸 Incoming file info:", req.file);
  
      const { content } = req.body;
      const filePath = req.file?.path;
  
      if (!content && !filePath) {
        console.warn("⚠️ Missing both content and image");
        return res.status(400).json({ message: "Content or image required" });
      }
  
      let uploadedImageUrl = null;
  
      // 🔼 Upload image to Cloudinary if provided
      if (filePath) {
        console.log("☁️ Uploading image to Cloudinary...");
        const result = await cloudinary.uploader.upload(filePath, {
          folder: "posts",
        });
        uploadedImageUrl = result.secure_url;
        console.log("✅ Cloudinary upload success:", uploadedImageUrl);
      } else {
        console.log("🖋️ No image provided, only text content");
      }
  
      // 🧩 Create new post
      const post = await Post.create({
        user: req.user._id,
        content,
        image: uploadedImageUrl,
      });
  
      console.log("✅ Post saved successfully:", post);
  
      res.status(201).json({
        success: true,
        message: "Post created successfully",
        post,
      });
    } catch (err) {
      console.error("❌ Error creating post:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

// ✅ Get all posts
export const getAllPosts = async (req, res) => {
    try {
      console.log("📡 Fetching all posts...");
  
      const posts = await Post.find()
        .populate("user", "name email avatar") // ✅ include name, email, and avatar
        .sort({ createdAt: -1 });
  
      // 🧠 Optional log to check images
      console.log("🖼️ Posts fetched with images:", posts.map(p => p.image).filter(Boolean));
  
      res.status(200).json({
        success: true,
        count: posts.length,
        posts,
      });
    } catch (err) {
      console.error("❌ Error fetching posts:", err);
      res.status(500).json({
        success: false,
        message: "Failed to fetch posts",
        error: err.message,
      });
    }
  };
  

  export const getPostById = async (req, res) => {
    try {
      console.log(`📡 Fetching post by ID: ${req.params.id}`);
  
      const post = await Post.findById(req.params.id)
        .populate("user", "name email avatar") // include avatar like getAllPosts
        .populate("comments.user", "name email avatar");
  
      if (!post) {
        console.warn("⚠️ Post not found:", req.params.id);
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
  
      // 🖼️ Log image info if available
      if (post.image) {
        console.log("🖼️ Post image:", post.image);
      }
  
      res.status(200).json({
        success: true,
        post,
      });
    } catch (err) {
      console.error("❌ Error fetching post by ID:", err);
      res.status(500).json({
        success: false,
        message: "Failed to fetch post",
        error: err.message,
      });
    }
  };
  

export const getUserPosts = async (req, res) => {
    try {
      const posts = await Post.find()
        .populate("user", "name email") // ✅ fetch name & email from User model
        .sort({ createdAt: -1 });
  
      res.json({
        success: true,
        posts,
      });
    } catch (err) {
      console.error("Error fetching posts:", err);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  };
  
// ❤️ Like or Unlike Post
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user._id;
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json({
      success: true,
      liked: !isLiked,
      likeCount: post.likes.length, // ✅ send total likes
      commentCount: post.comments.length, // ✅ send total comments too
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error toggling like" });
  }
};

// 💬 Add Comment
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ user: req.user._id, text });
    await post.save();

    res.json({
      success: true,
      comment: post.comments[post.comments.length - 1], // last added comment
      commentCount: post.comments.length, // ✅ updated total comments
      likeCount: post.likes.length, // ✅ include total likes
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding comment" });
  }
};

export const getComments = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
        .populate("comments.user", "name email"); // populate user details
  
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      res.status(200).json({
        success: true,
        comments: post.comments,
        commentCount: post.comments.length,
      });
    } catch (err) {
      console.error("Error fetching comments:", err);
      res.status(500).json({ message: "Error fetching comments" });
    }
  };

  export const updatePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post)
        return res.status(404).json({ success: false, message: "Post not found" });
  
      if (post.user.toString() !== req.user.id)
        return res.status(401).json({ success: false, message: "Unauthorized" });
  
      post.content = req.body.content || post.content;
      post.image = req.body.image || post.image;
  
      const updated = await post.save();
      res.json({ success: true, content: updated.content });
    } catch (err) {
      console.error("❌ Error updating post:", err);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  
  // ✅ Delete post
  export const deletePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post)
        return res.status(404).json({ success: false, message: "Post not found" });
  
      if (post.user.toString() !== req.user.id)
        return res.status(401).json({ success: false, message: "Unauthorized" });
  
      await post.deleteOne();
      res.json({ success: true, message: "Post deleted successfully" });
    } catch (err) {
      console.error("❌ Error deleting post:", err);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
