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
        const token = jwt.sign(
            { id: response._id, username: response.email },
            process.env.JWT_SECRET
        ); //Publicly visible do not put important stuff here
        return res.json({ status: "OK", data: token }); //Have the token
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
    if (!user) {
        return res.json({
            status: "error",
            error: "Invalid username/password",
        });
    }
    if (await bcrypt.compare(password, user.password)) {
        //Username password combination successful
        const token = jwt.sign(
            { id: user._id, username: user.email },
            process.env.JWT_SECRET
        ); //Publicly visible do not put important stuff here
        console.log(token);
        return res.status(200).json({ status: "OK", data: token });
    }

    return res.status(400).json({
        status: "error",
        error: "Invalid username/password",
    });
};

const getLoggedInName = async (req, res) => {
    try {
        const foundUser = await User.findOne({ _id: req.user.id });

        return res.status(200).json({ name: foundUser.name });
    } catch (err) {
        console.log(err);
    }
};

const getName = async (req, res) => {
    const { id } = req.body;
    try {
        const foundUser = await User.findOne({ id: id });

        return res.status(200).json({ name: foundUser.name });
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    register,
    login,
    getLoggedInName,
    getName,
};
