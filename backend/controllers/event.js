const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Event = require("../models/Event");

const newEvent = async (req, res) => {
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

    if (description) eventFields.description = description;

    try {
        // create event document and save
        let event = new Event(eventFields);

        await event.save();
        res.json(event);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};

module.exports = { newEvent };
