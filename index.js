import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import avatarRoutes from "./routes/avatarRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app = express();
const allowedOrigins = [
  "http://localhost:5173", // local React dev server
  "https://linkb-puce.vercel.app" // deployed Vercel frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("API is running successfully!");
});

// Auth Example Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api",userRoutes);


app.use("/api/logo", avatarRoutes);
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
