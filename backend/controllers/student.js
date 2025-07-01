const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const Attendance = require("../models/attendance");
const Class = require("../models/class");

// Register student
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Cloudinary Configuration
cloudinary.config({
  cloud_name: "dcttix6nr",
  api_key: "194799332213971",
  api_secret: "Pit2Vb302ZoZx6Oo3qZE2Ri8l-E",
});

exports.registerStudent = async (req, res) => {
  try {
    const { name, rollNo, email, password, year, group, branch } = req.body;
    
    // Find the class based on year, group, and branch
    const classData = await Class.findOne({ year, group, branch }).populate({ 
      path: "courses", 
      select: "_id" 
    });
    
    if (!classData) {
      return res.status(400).json({ 
        message: "Class not found. Please enter valid details." 
      });
    }
    
    // Check if student already exists
    let existingStudent = await Student.findOne({ rollNo });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Assign courses from class to student
    const assignedCourses = classData.courses.map(course => ({
      course: course._id,
    }));
    
    console.log("Uploaded files:", req.files);
    
    let profilePhotoUrl = null;
    
    // Upload profile photo to Cloudinary (if file is provided)
    if (req.files && req.files.profilePhoto && req.files.profilePhoto.length > 0) {
      try {
        const result = await cloudinary.uploader.upload(
          req.files.profilePhoto[0].path, 
          { folder: "uploads" }
        );
        profilePhotoUrl = result.secure_url;
        
        // Clean up the local file after upload to Cloudinary
        const fs = require('fs');
        fs.unlinkSync(req.files.profilePhoto[0].path);
      } catch (uploadError) {
        console.error("Error uploading to Cloudinary:", uploadError);
      }
    }
    
    // Create new student
    const student = new Student({
      name,
      rollNo,
      email,
      password: hashedPassword,
      class: classData._id,
      courses: assignedCourses,
      profilePhoto: profilePhotoUrl, // Save photo URL in DB
    });
    
    await student.save();
    
    // Add student to class's students array
    classData.students.push(student._id);
    await classData.save();
    
    res.status(201).json({ 
      message: "Student registered successfully", 
      student 
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      message: "Error registering student", 
      error: error.message 
    });
  }
};




// GET /api/student/details
exports.getStudentDetails = async (req, res) => {
  try {
    const studentId = req.user.id;

    // Populate class details and mentor name
    const student = await Student.findById(studentId)
      .populate({
        path: "class",
        select: "group branch year mentor",
        populate: {
          path: "mentor",
          select: "name",
        },
      })
      .select("name rollNo email profilePhoto class");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      name: student.name,
      rollNo: student.rollNo,
      email: student.email,
      profilePhoto: student.profilePhoto, // ✅ Include profile photo URL
      mentorName: student.class?.mentor?.name,
      group: student.class?.group,
      branch: student.class?.branch,
      year: student.class?.year,
    });
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ message: "Server error" });
  }
};




// Get student dashboard
exports.getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;

    // Fetch attendance records and ensure course is populated
    const attendanceRecords = await Attendance.find({ student: studentId })
      .populate({
        path: "course",
        select: "name",
      })
      .sort({ date: 1 });

    console.log("Fetched Attendance Records:", attendanceRecords);

    // Transform data into a course-wise structure
    const courseWiseAttendance = {};

    attendanceRecords.forEach(record => {
      if (!record.course) {
        console.warn("Warning: Missing course for record. Skipping:", record._id);
        return; // Skip records where course is missing
      }

      const courseId = record.course._id.toString();
      const courseName = record.course.name || "Unknown Course"; // Fallback for missing names
      const attendancePercentage = record.attendancePercentage || 0;

      if (!courseWiseAttendance[courseId]) {
        courseWiseAttendance[courseId] = {
          courseId,
          courseName,
          attendancePercentage,
          attendance: []
        };
      }

      courseWiseAttendance[courseId].attendance.push({
        date: record.date.toISOString().split("T")[0],
        status: record.status
      });
    });

    // Convert object to an array
    const formattedAttendance = Object.values(courseWiseAttendance);

    res.json({ attendance: formattedAttendance });
  } catch (err) {
    console.error("Error fetching student dashboard:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
