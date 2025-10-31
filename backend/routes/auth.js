const express = require("express");
const passport = require("../utils/passport"); // or "../config/passport" depending on your structure
const { login } = require("../controllers/auth");
const { googleAuthCallback } = require("../controllers/googleAuth");


const router = express.Router();

// 📌 Normal Login
router.post("/login", login);

// 📌 Step 1: Redirect to Google for login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 📌 Step 2: Google redirects back to this route after login
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthCallback
);


module.exports = router;
