const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, sparse: true },
  role: { type: String, enum: ["teacher", "mentor"], default: "teacher" },
  teachingCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
  mentorOfClass: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
});

module.exports = mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);
