const express = require("express");
const { uploadAttendanceExcel } = require("../controllers/attendance");
const upload = require("../middlewares/upload"); // Multer middleware for Excel files
const { scanQRCode } = require("../controllers/event");
const { authenticateUser } = require("../middlewares/auth");


const router = express.Router();

router.post("/upload-excel",upload,authenticateUser(["teacher","mentor"]), uploadAttendanceExcel);
router.post("/qr-code",scanQRCode);

module.exports = router;
