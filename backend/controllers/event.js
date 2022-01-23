const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const Event = require("../models/Event");
const User = require("../models/User");

const getEvents = async (req, res) => {
    try {
        Event.find({})
            .sort({ time: -1 })
            .exec((err, events) => {
                if (err) console.log(err);

                res.status(200).json({ events });
            });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

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
        location: [],
        time,
    };

    if (description) eventFields.description = description;

    const response = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
            params: {
                address: location,
                key: process.env.API_KEY,
            },
        }
    );

    eventFields.address = await response.data.results[0].formatted_address;

    let lat = await response.data.results[0].geometry.location.lat;
    let lng = await response.data.results[0].geometry.location.lng;

    eventFields.location.push(lat);
    eventFields.location.push(lng);

    try {
        // create event document and save
        let event = new Event(eventFields);

        await event.save();

        const user = await User.findOne({ _id: req.user.id });
        user.events.push(event);
        await user.save();

        res.json(event);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};

// get bookmarked event
const getBookmarkedEvents = async (req, res) => {
    try {
        //Variable that points to current user
        const user = await User.findOne({ _id: req.user.id });
        // get all bookmarked things from user
        const bookmarkedItems = user.bookmarkedEvents;
        // Send all bookmarked things back
        res.status(200).json({ bookmarkedItems: bookmarkedItems });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};

const getMyEvents = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        const myEvents = user.events;
        console.log(myEvents);
        res.status(200).json({ myEvents: myEvents });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};

// join event
const joinEvent = async (req, res) => {
    const { eventID } = req.body;

    try {
        const event = await Event.findOne({ _id: eventID });
        const user = await User.findOne({ _id: req.user.id });

        for (let i = 0; i < event.participants.length; i++) {
            if (event.participants[i] === user._id) {
                return res
                    .status(401)
                    .json({ error: "You already joined this event" });
            }
        }

        event.participants.push(user);
        user.bookmarkedEvents.push(event);

        await event.save();
        await user.save();
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    newEvent,
    getEvents,
    getBookmarkedEvents,
    joinEvent,
    getMyEvents,
};
