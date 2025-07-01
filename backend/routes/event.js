const express = require("express");
const { createEvent, registerForEvent ,getAllEvents,getEventStudents} = require("../controllers/event");
const { authenticateUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/create",authenticateUser(["teacher","mentor"]) ,createEvent);
router.post("/register", authenticateUser(["student"]) ,registerForEvent);
router.get("/getEvents", getAllEvents);
router.get("/:eventName/students", authenticateUser(["teacher","mentor"]), getEventStudents);

module.exports = router;
