import Profile from "../models/Profile.js";

// 🟢 Create Profile
export const createProfile = async (req, res) => {
  try {
    const { name, degree, skills, address } = req.body;

    // Prevent duplicate profile for same user
    const existing = await Profile.findOne({ user: req.user.id });
    if (existing)
      return res
        .status(400)
        .json({ success: false, message: "Profile already exists" });

    const profile = await Profile.create({
      user: req.user.id,
      name,
      degree,
      skills,
      address,
    });

    res.status(201).json({ success: true, profile });
  } catch (error) {
    console.error("❌ Error creating profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🟣 Get Profile by User ID
export const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id }).populate(
      "user",
      "name email"
    );
    if (!profile)
      return res.status(404).json({ success: false, message: "Profile not found" });

    res.json({ success: true, profile });
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🟡 Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { name, degree, skills, address } = req.body;

    const updated = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { name, degree, skills, address },
      { new: true, upsert: true } // if not exist, create new
    );

    res.json({ success: true, profile: updated });
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🔴 Delete Profile
export const deleteProfile = async (req, res) => {
  try {
    const deleted = await Profile.findOneAndDelete({ user: req.user.id });
    if (!deleted)
      return res.status(404).json({ success: false, message: "Profile not found" });

    res.json({ success: true, message: "Profile deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
