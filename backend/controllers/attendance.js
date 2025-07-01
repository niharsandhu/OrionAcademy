const Attendance = require("../models/attendance");
const Student = require("../models/Student");
const Course = require("../models/course");
const Teacher = require("../models/teacherModel");
const xlsx = require("xlsx");


// Upload attendance via Excel file
exports.uploadAttendanceExcel = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: "Please upload an Excel file" });
    }

    // 🟢 Read Excel file from buffer
    const filePath = req.files.xlsxFile[0].path;
     const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    let records = xlsx.utils.sheet_to_json(sheet);

    // ✅ Remove empty records
    records = records.filter(record => record.RollNo && record.Course && record.Status && record.Date);

    if (records.length === 0) {
      return res.status(400).json({ message: "No valid attendance records found" });
    }

    const teacherId = req.user.id; // Assuming teacher is authenticated
    const teacher = await Teacher.findById(teacherId).populate("teachingCourses");

    if (!teacher) {
      return res.status(403).json({ message: "Unauthorized: Teacher not found" });
    }

    const allowedCourses = new Set(teacher.teachingCourses.map(course => course.name));

    const processedStudents = new Set();
    let duplicateRecords = [];

    for (let record of records) {
      if (!allowedCourses.has(record.Course)) {
        console.error(`Unauthorized: Teacher cannot upload attendance for ${record.Course}`);
        continue;
      }

      const student = await Student.findOne({ rollNo: record.RollNo });
      const course = await Course.findOne({ name: record.Course });

      if (!student || !course) {
        console.error(`Error: Student (${record.RollNo}) or Course (${record.Course}) not found.`);
        continue;
      }

      // ✅ Convert Excel date to JavaScript date
      const excelDate = new Date((record.Date - 25569) * 86400000);
      const date = excelDate.toISOString().split("T")[0]; // Store as YYYY-MM-DD

      // ✅ Check if attendance already exists for this student, course, and date
      const existingAttendance = await Attendance.findOne({
        student: student._id,
        course: course._id,
        date: date,
      });

      if (existingAttendance) {
        duplicateRecords.push({ studentId: student._id, courseId: course._id, date });
        continue; // Skip duplicate entry
      }

      // ✅ Insert attendance if it's not a duplicate
      await Attendance.create({
        student: student._id,
        course: course._id,
        date: date,
        status: record.Status.toLowerCase() === "present" ? "Present" : "Absent",
      });

      // ✅ Update attendance percentage only once per student per course
      const key = `${student._id}-${course._id}`;
      if (!processedStudents.has(key)) {
        await updateAttendancePercentage(student._id, course._id);
        processedStudents.add(key);
      }
    }

    if (duplicateRecords.length > 0) {
      return res.status(409).json({
        message: "Duplicate attendance found",
        duplicates: duplicateRecords,
      });
    }

    res.status(201).json({ message: "Attendance uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading attendance", error });
  }
};


const updateAttendancePercentage = async (studentId, courseId) => {
  try {
    const totalClasses = await Attendance.countDocuments({ student: studentId, course: courseId });

    // ✅ Count both "Present" and "Duty Leave" as attended
    const attendedClasses = await Attendance.countDocuments({
      student: studentId,
      course: courseId,
      status: { $in: ["Present", "DutyLeave"] }
    });

    const attendancePercentage = totalClasses > 0 ? (attendedClasses / totalClasses) * 100 : 0;

    await Attendance.updateMany(
      { student: studentId, course: courseId },
      { $set: { attendancePercentage } }
    );

    console.log(`Updated attendance percentage for student ${studentId} in course ${courseId}: ${attendancePercentage.toFixed(2)}%`);
  } catch (error) {
    console.error("Error updating attendance percentage:", error);
  }
};
