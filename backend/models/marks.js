const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true }, // Student reference
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }, // Course reference
  examType: { type: String, enum: ["Midterm", "Final", "Quiz", "Assignment"], required: true }, // Exam type
  marksObtained: { type: Number, required: true }, // Marks obtained
  totalMarks: { type: Number, required: true }, // Total possible marks
});

module.exports = mongoose.model("Marks", marksSchema);
