const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  group: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: Number, required: true },
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }], // Multiple teachers
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", default: null }, // Single mentor
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }] ,// Optional, if needed
  courses: { type: [mongoose.Schema.Types.ObjectId], ref: "Course", default: [] },
});

const Class = mongoose.models.Class || mongoose.model("Class", classSchema);
module.exports = Class;

