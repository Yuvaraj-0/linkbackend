import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  degree: { type: String, required: true },
  skills: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  portfolio: { type: String },
  avatar: { type: String, },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("Profile", profileSchema);
