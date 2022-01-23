const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
            minlength: 3,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                ,
                "Please provide a valid email",
            ],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: [6, "Password too short"],
        },
        events: [],
        bookmarkedEvents: [],
    },
    { collection: "users" }
);

module.exports = mongoose.model("user", userSchema);
