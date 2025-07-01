const Class = require("../models/class");
const Course = require("../models/course");
const Teacher = require("../models/teacherModel");

// ✅ Create a new class
const createClass = async (req, res) => {
  try {
    const { group, branch, year } = req.body;

    // Check if class already exists
    const existingClass = await Class.findOne({ group, branch, year });
    if (existingClass) {
      return res.status(400).json({ message: "Class already exists" });
    }

    const newClass = new Class({ group, branch, year });
    await newClass.save();

    res.status(201).json({ message: "Class created successfully", class: newClass });
  } catch (error) {
    res.status(500).json({ message: "Error creating class", error: error.message });
  }
};

// ✅ Create a new course
const createCourse = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if course already exists
    const existingCourse = await Course.findOne({ name });
    if (existingCourse) {
      return res.status(400).json({ message: "Course already exists" });
    }

    const newCourse = new Course({ name });
    await newCourse.save();

    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    res.status(500).json({ message: "Error creating course", error: error.message });
  }
};

// ✅ Assign a teacher to a class
const assignTeacherToClass = async (req, res) => {
  try {
    const { email, group, branch, year } = req.body;

    // Find teacher by email
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Find class by group, branch, and year
    const selectedClass = await Class.findOne({ group, branch, year });
    if (!selectedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Add teacher to class if not already added
    if (!selectedClass.teachers.includes(teacher._id)) {
      selectedClass.teachers.push(teacher._id);
      await selectedClass.save();
    }

    // Also add class to teacher's assigned classes
    if (!teacher.classes.includes(selectedClass._id)) {
      teacher.classes.push(selectedClass._id);
      await teacher.save();
    }

    res.status(200).json({ message: "Teacher assigned to class successfully", class: selectedClass });
  } catch (error) {
    res.status(500).json({ message: "Error assigning teacher to class", error: error.message });
  }
};

// ✅ Assign a course to a teacher
const assignCourseToTeacher = async (req, res) => {
  try {
    const { email, courseName } = req.body;

    // Find teacher by email
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Find course by name
    const course = await Course.findOne({ name: courseName });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Assign course to teacher (Push into array)
    if (!teacher.teachingCourses.includes(course._id)) {
      teacher.teachingCourses.push(course._id);
      await teacher.save();
    }

    res.status(200).json({ message: "Course assigned to teacher successfully", teacher });
  } catch (error) {
    res.status(500).json({ message: "Error assigning course to teacher", error: error.message });
  }
};

const assignMentorToClass = async (req, res) => {
    try {
        const { email, group, branch, year } = req.body;

        // Find teacher by email
        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        // Find class by group, branch, and year
        const selectedClass = await Class.findOne({ group, branch, year });
        if (!selectedClass) {
            return res.status(404).json({ message: "Class not found" });
        }

        // Assign mentor to class
        selectedClass.mentor = teacher._id;
        await selectedClass.save();

        // Update teacher's role to 'mentor' and set mentorOfClass (single class)
        teacher.role = "mentor"; // ✅ Change role to mentor
        teacher.mentorOfClass = selectedClass._id; // ✅ Assign only one class

        await teacher.save();

        res.status(200).json({ 
            message: "Mentor assigned to class successfully", 
            class: selectedClass,
            teacher
        });
    } catch (error) {
        res.status(500).json({ message: "Error assigning mentor to class", error: error.message });
    }
};

const assignCoursesToClass = async (req, res) => {
    try {
        const { year, group, branch, courseNames } = req.body;

        // Find the class based on year, group, and branch
        const classData = await Class.findOne({ year, group, branch });

        if (!classData) {
            return res.status(404).json({ message: "Class not found" });
        }

        // Find courses by their names
        const courses = await Course.find({ name: { $in: courseNames } });

        if (courses.length !== courseNames.length) {
            return res.status(400).json({ message: "One or more courses not found" });
        }

        // Extract course IDs
        const courseIds = courses.map(course => course._id);

        // Assign courses to class (Avoid duplicate entries)
        classData.courses = [...new Set([...classData.courses, ...courseIds])];

        await classData.save();

        res.status(200).json({ 
            message: "Courses assigned to class successfully", 
            class: classData 
        });
    } catch (error) {
        res.status(500).json({ message: "Error assigning courses to class", error: error.message });
    }
};



  
module.exports = { createClass, createCourse, assignTeacherToClass, assignCourseToTeacher, assignMentorToClass , assignCoursesToClass};
