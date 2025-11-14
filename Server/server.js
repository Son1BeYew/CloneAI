const express = require("express");
const cors = require("cors");
require("dotenv").config();
const passport = require("passport");
const path = require("path");
const helmet = require("helmet");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");
const aiRoutes = require("./routes/ai");
const promptRoutes = require("./routes/prompts");
const promptLandscapeRoutes = require("./routes/promptLandscape");
const promptTrendingRoutes = require("./routes/promptTrending");
const announcementRoutes = require("./routes/announcementRoutes");
const profileRoutes = require("./routes/profileRoutes");
const topupRoutes = require("./routes/topup");
const historyRoutes = require("./routes/history");
const adminRoutes = require("./routes/admin");
const outfitStyleRoutes = require("./routes/outfitStyles");
const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

connectDB();

require("./config/passport")(passport);
app.use(passport.initialize());

// Serve generated outputs
app.use("/outputs", express.static(path.join(__dirname, "outputs")));

// Serve Client static files
app.use(express.static(path.join(__dirname, "../Client")));

// API Routes
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/prompts", promptRoutes);
app.use("/api/prompts-landscape", promptLandscapeRoutes);
app.use("/api/prompts-co-ban", promptRoutes);
app.use("/api/prompts-trending", promptTrendingRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/topup", topupRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/outfit-styles", outfitStyleRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// API 404 handler
app.get("*", (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
