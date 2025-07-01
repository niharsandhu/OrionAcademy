const multer = require("multer");
const path = require("path");

// Set Storage Engine - Changed to disk storage since you're using file paths
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Store files in 'uploads/' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

// File Type Validation
const fileFilter = (req, file, cb) => {
  const excelTypes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const imageTypes = ["image/jpeg", "image/jpg", "image/png"];
  
  if (excelTypes.includes(file.mimetype)) {
    req.fileType = "attendance"; // Mark as Attendance File
    cb(null, true);
  } else if (imageTypes.includes(file.mimetype)) {
    req.fileType = "coverPhoto"; // Mark as Cover Photo
    cb(null, true);
  } else {
    cb(new Error("Only Excel and image files are allowed"), false);
  }
};

// Multer Upload Middleware for multiple files
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter,
}).fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "xlsxFile", maxCount: 1 },
]);

module.exports = upload;