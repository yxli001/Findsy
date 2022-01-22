require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const app = express();

const PORT = 5000 || process.env.PORT;

// Models
const User = require("./models/User");
const Event = require("./models/Event");

// Middleware
//Secures HTTP headers
app.use(helmet());
//Stops XSS attacks
app.use(xss());
app.use(express.urlencoded({ extended: false }));

//Stops oversending to routes
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 min
    max: 100,
  })
);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to db");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ email: username }).lean();
  if (await bcrypt.compare(password, user.password)) {
    //Username password combination successful
    const token = jwt.sign(
      { id: user._id, username: user.email },
      process.env.JWT_SECRET
    ); //Publicly visible do not put important stuff here
    return res.json({ status: "error", data: token });
  }
  if (!user) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }
  res.json({ status: "error", error: "Invalid username/password" });
});

app.post("/api/register", async (req, res) => {
  const { name, username, password: plainTextPassword } = req.body;
  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({
      name: name,
      email: username,
      password: password,
    });
    console.log("User created successfully", response);
  } catch (error) {
    if (error.code === 11000) {
      //Duplicate key error
      return res.json({ status: "Error", error: "Username already in use" });
    }
    throw error;
  }

  res.send(req.body);
});

app.get("/api/register", (req, res) => {
  res.send("register page");
});

app.post(
  "/api/event",
  [
    check("title", "Title is required").not().isEmpty(),
    check("time", "Time is required").not().isEmpty(),
    check("location", "Location is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { title, time, location, description } = req.body;
    const eventFields = {
      title: title,
      author: req.user.id,
      time,
      location,
    };

    if (description) profileFields.description = description;

    try {
      let event = new Event(eventFields);

      await event.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
