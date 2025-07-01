const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["teacher","mentor"], default: "teacher" },
  teachingCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Multiple courses
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }], // Multiple classes
  mentorOfClass: { type: mongoose.Schema.Types.ObjectId, ref: "Class" }
});

const Teacher = mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
