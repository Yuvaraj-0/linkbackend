// controllers/userController.js
import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  try {
    // req.user is already set in middleware (decoded from JWT)
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get a user by ID (for public profile)
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password"); // remove password
    if (!user) return res.status(404).json({ message: "User not found" });

    // Optional: get user’s posts (if you want to show them too)
    // const posts = await Post.find({ user: id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      user,
      // posts, // uncomment if you want posts in same response
    });
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ success: false, message: "No query provided" });
    }

    console.log(`🔍 Searching users for query: "${query}"`);

    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    }).select("name email _id");

    console.log(`✅ Found ${users.length} user(s) for query: "${query}"`);

    res.status(200).json({ success: true, count: users.length, users });
  } catch (err) {
    console.error("❌ Error searching users:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};


