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
                console.log("Registration failed:");
                console.log(err);
                res.status(400).json(err);
            });
    },       

    login: (req, res) => {
        console.log(req.body)
        User.findOne({emailAddress: req.body.emailAddress})
            .then((user) => {
                if (user === null) {
                    return res.status(400).json({message: "Invalid login attempt"});
                    //check if the returned user object is null
                    //if the email is not found in db.users, returns an error message
                } else {
                    bcrypt.compare(req.body.password, user.password)
                    .then((isPasswordValid) => {
                        if (isPasswordValid === true) {
                            console.log("Password is valid");
                            console.log(user) 
                            console.log("Creating cookie and signing with JWT");
                            res.cookie("usertoken", 
                            jwt.sign({
                                user_id: user._id,
                                emailAddress: user.emailAddress,
                                admin: user.admin,
                                //payload containing data to save
                            },  process.env.JWT_SECRET_KEY1),
                                //secret used to sign / hash data in the cookie
                            {   httpOnly: true,
                                //expires: new Date(Date.now() + 900000)
                                //configuration settings for this cookie
                            })
                            .json({
                            message: "Login successful",
                            userLoggedIn: {
                                user_id: user._id,
                                email: user.emailAddress,
                                admin: user.admin} 
                                //returns data associated with the successful login
                            })
                    
                        } else {
                            //Password is invalid --- password comparison failed
                                console.log(user);
                                console.log("bcrypt comparison failed:");
                                console.log()
                                res.status(400).json({message: "Invalid login attempt (1)"}); 
                            }
                        
                    })
                    .catch((err) => {
                        console.log("Password comparison failed:");
                        res.status(400).json({message: "Invalid login attempt (2)"});
                    })
                }
            })
            .catch((err) => {
                console.log('findOne failed: email not found in the database.');
                res.status(400).json({message: "Invalid login attempt (3)"});
            })
    },
                        
    logout: (req, res) => {
        console.log("Logging out...")
        res.clearCookie("usertoken");
        res.status(200).json({message: "Logout successful."});
    },

    read: (req, res) => {
        console.log('inside findAllUsers:')
        User.find({})
            .then(allUsers => res.json(allUsers))
            .catch(err => res.status(400).json(err))
    },

    readOne: (req, res) => {
        console.log('inside findOne:');
        console.log('searching for:' + req.params.id);
        User.findOne({_id:req.params.id})
            .then(oneUser=> res.json(oneUser))
            .catch(err => res.status(400).json(err))
    },

    update: (req, res) => {
        //decode JWT to retrieve loggedin user data
        const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});
        const user = decodedJWT.payload 
        //restrict access to JWT user_id that matches Update user_id
        if (user._id === updatedUser._id) {
            User.findOneAndUpdate(
                {_id:req.params.id}, req.body, 
                {new:true, runValidators:true, context: 'query'})
                    .then(updatedUser => res.json(updatedUser))
                    .catch(err => res.status(400).json(err))
        }
        else {
            res.status(403).json({message: "Permission to update denied."})
        }
    },

    delete: (req, res) => {
        //decode JWT to retrieve loggedin user data
        const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});
        const user = decodedJWT.payload 

        if (user._id === deletedUser._id) {
            //restrict access to JWT user_id that matches Update user_id
            User.deleteOne({_id:req.params.id})
                .then(deletedUser => res.json(deletedUser))
                .catch(err => res.json(400).json(err))
        }
        else {
            res.status(403).json({message: "Permission to delete denied."})
        }
    }
};
