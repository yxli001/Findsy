require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const app = express();
const authRouter = require("./routes/auth");
const eventRouter = require("./routes/event");

const PORT = 5000 || process.env.PORT;

// Models
const User = require("./models/User");
const Event = require("./models/Event");

// Middleware
// Secures HTTP headers
app.use(helmet());
// Stops XSS attacks
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
        "GET, POST, PATCH, DELETE, OPTIONS, PUT"
    );
    next();
});

// Routes

app.use("/api/auth", authRouter);
app.use("/api/events", eventRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
