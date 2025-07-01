const Attendance = require("../models/attendance");
const Marks = require("../models/marks");
const { exportToExcel } = require("../utils/excelExport");

// Download Attendance as Excel
exports.downloadAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate("student course");
    const formattedData = attendance.map(a => ({
      RollNo: a.student.rollNo,
      Student: a.student.name,
      Course: a.course.name,
      Date: a.date.toISOString().split("T")[0],
      Status: a.status
    }));

    exportToExcel(formattedData, "Attendance_Report", res);
  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};

// Download Marks as Excel
exports.downloadMarks = async (req, res) => {
  try {
    const marks = await Marks.find().populate("student course");
    const formattedData = marks.map(m => ({
      RollNo: m.student.rollNo,
      Student: m.student.name,
      Course: m.course.name,
      Marks: m.marksObtained
    }));

    exportToExcel(formattedData, "Marks_Report", res);
  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};
