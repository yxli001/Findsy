const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const { newEvent } = require("../controllers/event");

// Create new event
router.post(
    "/",
    [auth],
    [
        check("title", "Title is required").not().isEmpty(),
        check("time", "Time is required").not().isEmpty(),
        check("location", "Location is required").not().isEmpty(),
    ],
    newEvent
);

module.exports = router;
