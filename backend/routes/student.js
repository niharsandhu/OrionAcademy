const express = require("express");
const { 
    registerStudent, 
    getStudentDashboard ,getStudentDetails
} = require("../controllers/student"); // ✅ Ensure this path is correct

const { authenticateUser } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/register",upload ,registerStudent);
router.get("/dashboard", authenticateUser(["student"]), getStudentDashboard);
router.get("/details", authenticateUser(["student"]), getStudentDetails);

module.exports = router;
