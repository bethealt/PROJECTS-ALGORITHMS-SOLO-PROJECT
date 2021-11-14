const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY1 = process.env.JWT_SECRET_KEY1;
const JWT_SECRET_KEY2 = process.env.JWT_SECRET_KEY2;

module.exports.secret1 = secret1;
module.exports.secret2 = secret2;

module.exports.authenticateUser = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret1, (err, payload) => {
        if (err) {
        res.status(401).json({verified: false});
        } else {
        next();
        }
    });
}

module.exports.authenticateAdmin = (req, res, next) => {
    jwt.verify(req.cookies.admintoken, secret2, (err, payload) => {
        if (err) {
        res.status(401).json({verified: false});
        } else {
        next();
        }
    });
}