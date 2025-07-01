const Attendance = require("../models/attendance");
const Marks = require("../models/marks");
const Course = require("../models/course");
const bcrypt = require("bcryptjs");
const Teacher = require("../models/teacherModel");


const registerTeacher = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ✅ Check if the teacher already exists
    let existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: "Teacher already exists" });
    }

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new teacher (No class/course assigned at registration)
    const newTeacher = new Teacher({
      name,
      email,
      password: hashedPassword,
      role: role || "teacher",
      mentorOfClasses: [], // Admin will assign later
      teachingCourses: [], // Admin will assign later
      teachingClasses: [] // Admin will assign later
    });

    await newTeacher.save();

    res.status(201).json({ message: "Teacher registered successfully", teacher: newTeacher });
  } catch (error) {
    console.error("Error registering teacher:", error);
    res.status(500).json({ message: "Error registering teacher", error: error.message });
  }
};

module.exports = { registerTeacher };



// Get all classes the teacher teaches
const getTeacherClasses = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate("teachingCourses.course teachingCourses.class");
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    res.status(200).json(teacher.teachingCourses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching classes", error });
  }
};

// Upload attendance
const uploadAttendance = async (req, res) => {
  try {
    const { studentId, courseId, date, status } = req.body;

    const attendance = new Attendance({ student: studentId, course: courseId, date, status });
    await attendance.save();

    res.status(201).json({ message: "Attendance marked", attendance });
  } catch (error) {
    res.status(500).json({ message: "Error uploading attendance", error });
  }
};

// Upload marks
const uploadMarks = async (req, res) => {
  try {
    const { studentId, courseId, marks } = req.body;

    const marksRecord = new Marks({ student: studentId, course: courseId, marks });
    await marksRecord.save();

    res.status(201).json({ message: "Marks uploaded", marksRecord });
  } catch (error) {
    res.status(500).json({ message: "Error uploading marks", error });
  }
};

// Get teacher's classes and courses
const getTeacherDashboard = async (req, res) => {
    try {
      const teacherId = req.user.id;
      const courses = await Course.find({ teacher: teacherId }).populate("class");
  
      res.json({ courses });
    } catch (err) {
      res.status(500).json({ message: "Server Error", err });
    }
  };
  
  // Get mentor's class details
  const getMentorDashboard = async (req, res) => {
    try {
      const mentorId = req.user.id;
      const students = await Student.find({ mentor: mentorId });
  
      res.json({ students });
    } catch (err) {
      res.status(500).json({ message: "Server Error", err });
    }
  };

  module.exports = { registerTeacher, getTeacherClasses, uploadAttendance, uploadMarks, getTeacherDashboard, getMentorDashboard };
  