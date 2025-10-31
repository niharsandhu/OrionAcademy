const jwt = require("jsonwebtoken");

exports.googleAuthCallback = async (req, res) => {
  try {
    const { user, role } = req.user;

    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Redirect based on role directly to the correct dashboard
    if (role === "student") {
      return res.redirect(
        `http://localhost:3000/login?token=${token}&role=student`
      );
    } else if (role === "teacher") {
      return res.redirect(
        `http://localhost:3000/login?token=${token}&role=teacher`
      );
    } else {
      return res.redirect(`http://localhost:3000/login?error=InvalidRole`);
    }
  } catch (err) {
    console.error("Google Auth Callback Error:", err);
    res.redirect(`http://localhost:3000/login?error=GoogleAuthFailed`);
  }
};
