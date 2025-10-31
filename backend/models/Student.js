const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, unique: true, sparse: true }, // optional for Google users
  email: { type: String, unique: true, required: true },
  password: { type: String, sparse: true }, // optional for Google users
  profilePhoto: { type: String },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: false },
  courses: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    },
  ],
});

module.exports = mongoose.models.Student || mongoose.model("Student", studentSchema);
