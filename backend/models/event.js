const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Event name
  date: { type: Date, required: true }, // Event date
  venue: { type: String, required: true }, // Event venue
  description: { type: String, required: true }, // Event details
  prize: { type: String }, // Prize details
  organiser: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true }, // Event organiser (teacher)
  organiserClub: { type: String, required: true }, // Club name of the organiser
  registeredStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], // Registered students
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Event", eventSchema);
