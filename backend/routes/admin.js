const express = require("express");
const router = express.Router();
const {
  createClass,
  createCourse,
  assignTeacherToClass,
  assignCourseToTeacher,
  assignMentorToClass,
  assignCoursesToClass
} = require("../controllers/admin");

// ✅ Route to create a new class
router.post("/class", createClass);

// ✅ Route to create a new course
router.post("/course", createCourse);

// ✅ Route to assign a teacher to a class
router.post("/assign-teacher", assignTeacherToClass);

// ✅ Route to assign a course to a teacher
router.post("/assign-course", assignCourseToTeacher);

// ✅ Route to assign a mentor to a class
router.post("/assign-mentor", assignMentorToClass);

router.post("/assign-coursesToClass",assignCoursesToClass);

module.exports = router;
