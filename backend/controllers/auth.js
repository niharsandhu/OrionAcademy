const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const Teacher = require("../models/teacherModel");

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let user = role === "student" ? await Student.findOne({ email }) : await Teacher.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};


