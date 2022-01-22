const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { validationResult } = require("express-validator");

const register = async (req, res) => {
    // Check to see if required fields were sent
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    //Doesn't create JWT Token
    const { name, username, password: plainTextPassword } = req.body;
    const password = await bcrypt.hash(plainTextPassword, 10);
    try {
        const response = await User.create({
            name: name,
            email: username,
            password: password,
        });

        return res.json({ user: response });
    } catch (error) {
        if (error.code === 11000) {
            //Duplicate key error
            return res.json({
                status: "Error",
                error: "Username already in use",
            });
        }
        throw error;
    }
};

const login = async (req, res) => {
    // Check to see if required fields were sent
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const { username, password } = req.body;
    const user = await User.findOne({ email: username }).lean();
    if (await bcrypt.compare(password, user.password)) {
        //Username password combination successful
        const token = jwt.sign(
            { id: user._id, username: user.email },
            process.env.JWT_SECRET
        ); //Publicly visible do not put important stuff here
        return res.json({ status: "OK", data: token });
    }
    if (!user) {
        return res.json({
            status: "error",
            error: "Invalid username/password",
        });
    }
    res.json({ status: "error", error: "Invalid username/password" });
};

module.exports = {
    register,
    login,
};
