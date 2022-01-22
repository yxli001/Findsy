const jwt = require("jsonwebtoken");

// Auth middleware
const auth = (req, res, next) => {
    const token = req.headers["authorization"];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (err) console.log(err);
            return res.sendStatus(403);
        }

        req.user = user;

        next();
    });
};

module.exports = auth;
