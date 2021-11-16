const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY1;

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret, 
        (err, payload) => {
            if (err) {
                console.log('Authentication failed:');
                console.log(err);
                res.status(401).json({verified: false});
            } else {
                console.log('Authentication successful.')
                next();
            }
        }
    )
}