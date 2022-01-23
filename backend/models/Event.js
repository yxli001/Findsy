const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    posted: {
        type: Date,
        default: Date.now,
    },
    time: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        require: true,
    },
    location: [],
    description: {
        type: String,
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],
});

module.exports = mongoose.model("event", eventSchema);
