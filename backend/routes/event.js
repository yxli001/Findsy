const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const {
    newEvent,
    getEvents,
    getBookmarkedEvents,
    joinEvent,
    getMyEvents,
    getParticipants,
} = require("../controllers/event");

// Get all events
router.get("/", getEvents);

// Get all bookmarked events
router.get("/bookmarked", [auth], getBookmarkedEvents);
//Gets all events
router.get("/my_events", [auth], getMyEvents);
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

router.get("/get_participants/:eventID", [auth], getParticipants);

// Join event
router.put("/join", [auth], joinEvent);

module.exports = router;
