const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
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
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
    ],
});

module.exports = mongoose.model("event", eventSchema);
