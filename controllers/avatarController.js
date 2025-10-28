import Avatar from "../models/Avatar.js";
import User from "../models/User.js";

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const avatarUrl = `/uploads/avatars/${req.file.filename}`; // file path
    const userId = req.user.id;

    let avatar = await Avatar.findOne({ userId });
    if (avatar) {
      avatar.avatarUrl = avatarUrl;
      await avatar.save();
    } else {
      avatar = await Avatar.create({ userId, avatarUrl });
    }

    // Update user's avatar reference
    await User.findByIdAndUpdate(userId, { avatar: avatarUrl });

    res.status(200).json({ message: "Avatar uploaded successfully", avatar });
  } catch (error) {
    console.error("❌ Avatar upload failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserAvatar = async (req, res) => {
  try {
    const { userId } = req.params;
    const avatar = await Avatar.findOne({ userId });
    if (!avatar) return res.status(404).json({ message: "Avatar not found" });
    res.status(200).json(avatar);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
