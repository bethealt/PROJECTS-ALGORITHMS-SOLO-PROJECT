const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register: (req, res) => {
        console.log("in register:");
        console.log(req.body);
        const user = new User(req.body);
        //uses req data and the user model contructor to create a user object

        user.save()
            .then((newUser) => {
                console.log("Registration successful.");
                console.log(newUser);
                res.json({
                    message: "Registration successful.",
                    user: newUser
                })
            })
            .catch((err) => {
                console.log("Registration failed.");
                res.status(400).json(err);
            });
    },       

    login: (req, res) => {
        User.findOne({emailAddress: req.body.emailAddress})
            .then((user) => {
                if (user === null) {
                    return res.status(400).json({message: "Invalid login attempt"});
                    //check if the returned user object is null
                    //if the email is not found in db.users, returns an error message
                }
                else {
                    const correctPassword = bcrypt.compare(req.body.password, user.password)
                    .then((correctPassword) => {
                        if (correctPassword) {
                        console.log("Password is valid");
                        console.log(user) 
                        console.log("Signing JSON webtoken");
                        res.cookie("usertoken", 
                        jwt.sign({
                            user_id: user._id,
                            email: user.emailAddress,
                            admin: user.admin,
                            //payload containing data to save
                        },  process.env.JWT_SECRET_KEY1),
                            //secret used to sign / hash data in the cookie
                        {   httpOnly: true,
                            expires: new Date(Date.now() + 900000)
                            //configuration settings for this cookie
                        })
                        .json({
                        message: "Login successful",
                        userLoggedIn: user.emailAddress
                        })
                    
                        } else {
                            //passwords did not match
                            if (!correctPassword) {
                                return res.status(400).json(err)}};
                    })
                    .catch((err) => {
                        console.log("Password comparison failed");
                        res.status(400).json({message: "Invalid login attempt"});
                    })
                }
            })
    },
                        
    logout: (req, res) => {
        console.log("Logging out user")
        res.clearCookie("usertoken");
        res.status(200).json({message: "Logout successful."});
    },

    read: (req, res) => {
        User.find({})
            .then(allUsers => res.json(allUsers))
            .catch(err => res.status(500).json(err))
    },

    readOne: (req, res) => {
        User.findOne({_id:req.params.id})
            .then(oneUser=> res.json(oneUser))
            .catch(err => res.status(500).json(err))
    },

    update: (req, res) => {
        User.findOneAndUpdate(
            {_id:req.params.id}, req.body, 
            {new:true, runValidators:true, context: 'query'})
                .then(updateUser => res.json(updateUser))
                .catch(err => res.status(400).json(err))
    },

    delete: (req, res) => {
        User.deleteOne({_id:req.params.id})
            .then(deleteConfirmation => res.json(deleteConfirmation))
            .catch(err => res.json(err))
    }
}
