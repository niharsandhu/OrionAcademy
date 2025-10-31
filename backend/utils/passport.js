const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Student = require("../models/Student");
const Teacher = require("../models/teacherModel");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const photo = profile.photos?.[0]?.value;

        // Check if user exists as Student or Teacher
        let user = await Student.findOne({ email });
        let role = "student";

        if (!user) {
          user = await Teacher.findOne({ email });
          if (user) role = "teacher";
        }

        // ❌ If user not found, stop here — don’t create new user
        if (!user) {
          console.log("❌ Google login attempt failed — user not registered:", email);
          return done(null, false, { message: "User not registered" });
        }

        // ✅ If found, pass user and role to controller
        return done(null, { user, role });
      } catch (err) {
        console.error("Google Auth Error:", err);
        done(err, null);
      }
    }
  )
);

// Serialize / Deserialize
passport.serializeUser((data, done) => done(null, data));
passport.deserializeUser((data, done) => done(null, data));

module.exports = passport;
