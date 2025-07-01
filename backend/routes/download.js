const express = require("express");
const { downloadAttendance, downloadMarks } = require("../controllers/download");
const {  authenticateUser } = require("../middlewares/auth");

const router = express.Router();

router.get("/attendance", authenticateUser(["teacher", "mentor"]), downloadAttendance);
router.get("/marks", authenticateUser(["teacher", "mentor"]), downloadMarks);

module.exports = router;
