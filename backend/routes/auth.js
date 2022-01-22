const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { register, login } = require("../controllers/auth");

router.post(
    "/register",
    [
        check("name", "Name is required").not().isEmpty(),
        check("username", "Username is required").not().isEmpty(),
        check("password", "password is required").not().isEmpty(),
    ],
    register
);
router.post(
    "/login",
    [
        check("username", "Username is required").not().isEmpty(),
        check("password", "password is required").not().isEmpty(),
    ],
    login
);

module.exports = router;
