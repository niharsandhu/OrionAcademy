const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const passport = require("./utils/passport.js"); // ⬅️ Google OAuth setup


// Import Routes
const studentRoutes = require("./routes/student.js");
const teacherRoutes = require("./routes/teacher.js");
const attendanceRoutes = require("./routes/attendance.js");
const eventRoutes = require("./routes/event.js");
const downloadRoutes = require("./routes/download.js");
const adminRoutes = require("./routes/admin.js");
const authRoutes = require("./routes/auth.js");
const googleAuthRoutes = require("./routes/auth.js"); // ⬅️ NEW

// Initialize App
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Google OAuth session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/events", eventRoutes);
app.use("/download", downloadRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/auth", googleAuthRoutes); // ⬅️ Google OAuth Routes

// Connect to MongoDB and start server
const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(port, () => console.log(`✅ Server running on port ${port}`)))
  .catch((err) => console.error("❌ Database connection failed:", err));
