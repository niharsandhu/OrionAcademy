const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }], // Teachers assigned to course
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }] // Classes where the course is taught
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
module.exports = Course;
