const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profilePhoto: {type:String}, 
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  courses: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    }
  ]
});

module.exports = mongoose.model("Student", studentSchema);
