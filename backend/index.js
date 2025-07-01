const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const studentRoutes = require("./routes/student.js");
const teacherRoutes = require("./routes/teacher.js");
const attendanceRoutes = require("./routes/attendance.js");
const eventRoutes = require("./routes/event.js");
const downloadRoutes = require("./routes/download.js");
const adminRoutes = require("./routes/admin.js");
const authRoutes = require("./routes/auth.js");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/events", eventRoutes);
app.use("/download", downloadRoutes);
app.use("/admin",adminRoutes);
app.use("/auth",authRoutes);

const port = process.env.PORT;
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(port, () => console.log(`Server running on ${port}`)))
  .catch((err) => console.error("Database connection failed", err));
