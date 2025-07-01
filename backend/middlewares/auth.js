const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacherModel");
const Student = require("../models/Student");

exports.authenticateUser = (roles = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.header("Authorization");
      if (!authHeader) {
        return res.status(401).json({ message: "Access denied. No token provided." });
      }

      // Extract token correctly
      const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

      console.log("Received Token:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);

      let user = await Teacher.findById(decoded.id).select("-password");
      let role = "teacher";

      if (!user) {
        user = await Student.findById(decoded.id).select("-password");
        role = "student";
      }

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Role-based access control
      if (roles.length && !roles.includes(role)) {
        return res.status(403).json({ message: "Access denied. Unauthorized role." });
      }

      req.user = user;
      req.user.role = role;
      next();
    } catch (error) {
      console.error("JWT Verification Error:", error);
      res.status(401).json({ message: "Invalid token" });
    }
  };
};



exports.restrictToTeacher = (req, res, next) => {
    if (req.user.role !== "teacher" && req.user.role !== "mentor") {
      return res.status(403).json({ message: "Access denied. Teachers only!" });
    }
    next();
  };
  
