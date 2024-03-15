const mongoose = require("mongoose");
const express = require("express");
const { User, Course, Admin } = require("../db");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../middleware/auth");
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

// Admin routes
router.get("/me", authenticateJwt, async (req, res) => {
  const admin = await Admin.findOne({ username: req.user.username });
  if (!admin) {
    res.status(403).json({ msg: "Admin doesnt exist" });
    return;
  }
  res.json({
    username: admin.username,
  });
});

router.post("/signup", async (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;
  if (!username || !password)
    res
      .status(400)
      .json({ message: "Please provide both username and password" });
  else {
    // check for existing admin username
    const admin = await Admin.findOne({ username });
    if (admin)
      res.status(400).json({
        message: "Admin already exists",
      });
    else {
      const newAdmin = new Admin({
        username: username,
        password: password,
      });
      newAdmin.save();
      //   jwt token generate;
      const token = jwt.sign({ username, role: "admin" }, secretKey, {
        expiresIn: "1h",
      });
      res.json({ message: "Admin created successfully", token });
    }
  }
});

router.post("/login", async (req, res) => {
  // logic to log in admin
  const { username, password } = req.headers;
  // check for valid combination of admin username and password exists
  const admin = await Admin.findOne({ username, password });
  if (!admin) {
    return res.status(401).json("Invalid Username or Password");
  } else {
    // create a JWT token
    const token = jwt.sign({ username, role: "admin" }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  }
});

router.post("/courses", authenticateJwt, async (req, res) => {
  // logic to create a course
  const courserDetails = req.body;
  //   check for already existing course
  const course = await Course.findOne({ title: courserDetails.title });
  if (course) {
    return res.status(409).json({ message: "Course already exists" });
  } else {
    const newCourse = new Course(courserDetails);
    newCourse.save();
    res.json({ message: "Course added Successfully!" });
  }
});

router.put("/courses/:courseId", authenticateJwt, async (req, res) => {
  try {
    const id = req.params.courseId;
    const course = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (course) {
      res.json({
        message: `The course with the id ${id} has been updated`,
        updatedCourse: course,
      });
    } else {
      res.status(404).json({ message: "No such course found" });
    }
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/courses", authenticateJwt, async (req, res) => {
  // logic to get all courses
  const courses = await Course.find({});
  res.json({
    courses,
  });
});

router.get("/course/:courseId", authenticateJwt, async (req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  res.json({ course });
});

module.exports = router;
