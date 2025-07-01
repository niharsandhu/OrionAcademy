const express = require("express");
const { getTeacherClasses, uploadAttendance, uploadMarks ,registerTeacher,getTeacherDashboard} = require("../controllers/teacher");
const {  authenticateUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", registerTeacher);
router.get("/:id/classes", getTeacherClasses);
router.post("/upload-attendance", uploadAttendance);
router.post("/upload-marks", uploadMarks);
router.get("/teacher-dashboard", authenticateUser(["teacher", "mentor"]), getTeacherDashboard);

module.exports = router;
