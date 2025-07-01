const Event = require("../models/Event");
const Student = require("../models/Student");
const QRCode = require("qrcode");
const nodemailer = require("nodemailer");
const Attendance = require("../models/attendance");

// Create event (Only Teacher Access)
exports.createEvent = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. No user data found." });
    }

    if (req.user.role !== "teacher" && req.user.role !== "mentor") {
      return res.status(403).json({ message: "Access denied. Only teachers can create events." });
    }

    const { name, date, venue, description, prize, organiserClub } = req.body;
    const organiserId = req.user.id; // Teacher ID from token

    const event = new Event({ name, date, venue, description, prize, organiser: organiserId, organiserClub });
    await event.save();

    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error:error.message});
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("organiser", "name email"); // Get organiser details
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

// Register student for event (Generate QR and Send Email)
exports.registerForEvent = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can register for events." });
    }

    const { eventName } = req.body;
    const studentId = req.user.id;

    // Find event by name
    const event = await Event.findOne({ name: eventName });
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check if student is already registered
    if (event.registeredStudents.includes(studentId)) {
      return res.status(400).json({ message: "You are already registered for this event." });
    }

    // Find student and get roll number
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Register student
    event.registeredStudents.push(studentId);
    await event.save();

    // Generate QR Code with Roll No and Event Name
    const qrData = `Roll No: ${student.rollNo}, Event: ${event.name}`;
    const qrCodeUrl = await QRCode.toDataURL(qrData);

    // Send QR Code via Email
    await sendEmail(student.email, ` ${event.name}`, qrCodeUrl);

    res.status(200).json({ message: "Registered successfully. QR code sent to email.", event });
  } catch (error) {
    res.status(500).json({ message: "Error registering for event", error:error.message });
  }
};

// Email function to send QR code
const sendEmail = async (to, eventName, qrCodeUrl) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Convert base64 QR code to a buffer
  const base64Data = qrCodeUrl.replace(/^data:image\/png;base64,/, "");
  const qrBuffer = Buffer.from(base64Data, "base64");

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Registration Confirmed for ${eventName}`,
    html: `
      <h2>Congratulations! You have registered for ${eventName}.</h2>
      <p>Scan the QR code below at the event entrance:</p>
      <img src="cid:qrCode" alt="QR Code" />
      <p>See you at the event!</p>
    `,
    attachments: [
      {
        filename: "qrcode.png",
        content: qrBuffer,
        encoding: "base64",
        cid: "qrCode", // Content ID for embedding in HTML
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

exports.scanQRCode = async (req, res) => {
  try {
    const { qrData } = req.body; // Get QR data from request
    console.log("Received QR Data:", qrData);

    if (!qrData) {
      console.error("No QR data received.");
      return res.status(400).json({ message: "Invalid QR code data" });
    }

    const dataParts = qrData.split(",");
    if (dataParts.length < 2) {
      console.error("Invalid QR format. Expected 'rollNo,eventName'. Received:", qrData);
      return res.status(400).json({ message: "Invalid QR code format" });
    }

    const rollNo = dataParts[0].trim();
    const eventName = dataParts[1].trim();
    console.log("Extracted Roll No:", rollNo);
    console.log("Extracted Event Name:", eventName);

    // Find student by roll number
    const student = await Student.findOne({ rollNo }).populate("courses.course");
    if (!student) {
      console.error("Student not found for rollNo:", rollNo);
      return res.status(404).json({ message: "Student not found" });
    }
    console.log("Student Found:", student);

    // Find event by name
    const event = await Event.findOne({ name: eventName });
    if (!event) {
      console.error("Event not found for name:", eventName);
      return res.status(404).json({ message: "Event not found" });
    }
    console.log("Event Found:", event);

    // Ensure event.date is a valid Date object
    let eventDate;
    if (event.date instanceof Date) {
      eventDate = event.date.toISOString().split("T")[0]; // Safe conversion
    } else {
      eventDate = new Date(event.date).toISOString().split("T")[0]; // Convert from string
    }
    console.log("Using Event Date for Duty Leave:", eventDate);

    if (!event.registeredStudents.some(id => id.equals(student._id))) {
      console.error("Student is not registered for this event:", eventName);
      return res.status(400).json({ message: "Student is not registered for this event." });
    }
    console.log("Student is registered for the event.");

    // Ensure student has courses before marking attendance
    if (!student.courses || student.courses.length === 0) {
      console.error("No courses found for student:", student._id);
      return res.status(400).json({ message: "No courses linked to student." });
    }

    // Loop through all courses and mark duty leave for the event date
    for (const courseEntry of student.courses) {
      if (!courseEntry.course) {
        console.error("Invalid course found:", courseEntry);
        continue;
      }

      console.log("Processing Course:", courseEntry.course._id);

      // Check if DutyLeave already exists for this course on the event date
      const existingDL = await Attendance.findOne({
        student: student._id,
        course: courseEntry.course._id,
        date: eventDate, // Use event's date
        status: "DutyLeave"
      });

      if (existingDL) {
        console.log(`Duty Leave already marked for course ${courseEntry.course._id} on ${eventDate}, skipping duplicate entry.`);
        continue; // Skip if already marked
      }

      // If no existing DL, create a new one
      await Attendance.findOneAndUpdate(
        { student: student._id, course: courseEntry.course._id, date: eventDate }, // Use event date
        { 
          $set: { 
            dutyLeave: true, 
            status: "DutyLeave" 
          } 
        },
        { new: true, upsert: true } // Prevent duplicate entries
      );

      // Update attendance percentage for this course
      await updateAttendancePercentage(student._id, courseEntry.course._id);
    }

    console.log("✅ Duty Leave marked for all courses successfully based on event date");

    res.status(200).json({ message: `QR Code scanned successfully. Duty leave marked for event date: ${eventDate}` });
  } catch (error) {
    console.error("Error scanning QR code:", error);
    res.status(500).json({ message: "Error scanning QR code", error: error.message });
  }
};


const updateAttendancePercentage = async (studentId, courseId) => {
  try {
    const totalClasses = await Attendance.countDocuments({ student: studentId, course: courseId });
    
    // ✅ Count both Present and Duty Leave as attended classes
    const attendedClasses = await Attendance.countDocuments({ 
      student: studentId, 
      course: courseId, 
      status: { $in: ["Present", "DutyLeave"] } 
    });

    const attendancePercentage = totalClasses > 0 ? (attendedClasses / totalClasses) * 100 : 0;

    await Attendance.updateMany(
      { student: studentId, course: courseId },
      { $set: { attendancePercentage } }
    );

    console.log(`Updated attendance percentage for student ${studentId} in course ${courseId}: ${attendancePercentage.toFixed(2)}%`);
  } catch (error) {
    console.error("Error updating attendance percentage:", error);
  }
};

exports.getEventStudents = async (req, res) => {
  try {
    const { eventName } = req.params;
    const event = await Event.findOne({name: eventName}).populate("registeredStudents", "name rollNo email profilePhoto");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event.registeredStudents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error: error.message });
  }
};