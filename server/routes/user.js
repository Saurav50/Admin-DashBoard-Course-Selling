const express = require("express");
const { authenticateJwt, secretKey } = require("../middleware/auth");
const { User, Course, Admin } = require("../db");
const router = express.Router();

// User routes
router.post("/users/signup", async (req, res) => {
  // logic to sign up user
  const { username, password } = req.body;
  if (!username || !password)
    res
      .status(400)
      .json({ message: "Please provide both username and password" });
  else {
    // check for existing user username
    const user = await User.findOne({ username });
    if (user)
      res.status(400).json({
        message: "User already exists",
      });
    else {
      const newUser = new User({
        username: username,
        password: password,
      });
      newUser.save();
      //   jwt token generate;
      const token = jwt.sign({ username, role: "user" }, secretKey, {
        expiresIn: "1h",
      });
      res.json({ message: "User created successfully", token });
    }
  }
});

router.post("/users/login", async (req, res) => {
  // logic to log in user
  const { username, password } = req.headers;
  // check for valid combination of user username and password exists
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(401).json("Invalid Username or Password");
  } else {
    // create a JWT token
    const token = jwt.sign({ username, role: "user" }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  }
});

router.get("/users/courses", authenticateJwt, async (req, res) => {
  // logic to list all courses
  const courses = await Course.find({ published: true });
  res.json({
    courses,
  });
});

router.post("/users/courses/:courseId", authenticateJwt, async (req, res) => {
  // logic to purchase a course
  const { courseId } = req.params;
  const user = await User.findOne({ username: req.user.username });
  if (!user) {
    return res.status(403).json({
      message: "You are not logged in!",
    });
  } else {
    // get course details from COURSE
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    } else {
      // check if already user has purchased or not
      const alreadyPurchased = user.purchasedCourses.find((course) => {
        return String(course._id) === String(courseId);
      });
      if (alreadyPurchased) {
        return res
          .status(409)
          .json({ message: "User already owns this course!" });
      } else {
        user.purchasedCourses.push(course);
        user.save();
        res.json({
          message: `Successfully purchased ${course.title}`,
        });
      }
    }
  }
});

router.get("/users/purchasedCourses", authenticateJwt, async (req, res) => {
  // logic to view purchased courses
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

module.exports = router;
