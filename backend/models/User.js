const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    events: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "events",
        },
    ],
});

module.exports = mongoose.model("user", userSchema);
