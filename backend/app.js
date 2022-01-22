require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const { check, validationResult } = require("express-validator");
const app = express();

const PORT = 5000 || process.env.PORT;

// Models
const User = require("./models/User");
const Event = require("./models/Event");

// Middleware
// Secures HTTP headers
app.use(helmet());
// Stops XSS attacks
app.use(xss());

//Stops oversending to routes
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, //15 min
        max: 100,
    })
);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Conntected to db");
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

app.get("/api", (req, res) => {});

// app.post("/register", async (req, res) => {
//     console.log(req.body);
//     res.json({ status: "OK" });
// });

// Create new event
app.post(
    "/api/event",
    [
        check("title", "Title is required").not().isEmpty(),
        check("time", "Time is required").not().isEmpty(),
        check("location", "Location is required").not().isEmpty(),
    ],
    async (req, res) => {
        // Check to see if required fields were sent
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const { title, time, location, description } = req.body;

        // build event object
        const eventFields = {
            title: title,
            author: req.user.id,
            time,
            location,
        };

        if (description) profileFields.description = description;

        try {
            // create event document and save
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
