import Profile from "../models/Profile.js";
import fs from "fs";

// 🟢 CREATE a new profile
export const createProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = new Profile({ _id: userId, ...req.body });
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟡 UPDATE existing profile (text fields only)
export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updated = await Profile.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Profile not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔵 UPLOAD or UPDATE Avatar separately
export const uploadAvatar = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const profile = await Profile.findById(userId);
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    // Delete old avatar if exists
    if (profile.avatar && fs.existsSync(profile.avatar)) fs.unlinkSync(profile.avatar);

    profile.avatar = req.file.path;
    await profile.save();

    res.json({ success: true, avatar: profile.avatar });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
