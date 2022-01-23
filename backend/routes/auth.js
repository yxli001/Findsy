const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const {
    register,
    login,
    getName,
    getLoggedInName,
} = require("../controllers/auth");

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

router.get("/get_username", [auth], getLoggedInName);

router.post("/get_name", getName);

module.exports = router;
