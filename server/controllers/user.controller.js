const User = require('../models/user.model');
const Course = require('../models/course.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register: (req, res) => {
        const {
            firstName, 
            lastName, 
            emailAddress, 
            birthDate, 
            zipcode,
            password, 
            courses} = req.body;
        User.create(req.body)
            .then(user => {
                const payload = {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    admin: user.admin,
                  };
                const userToken = jwt.sign(payload, process.env.SECRET_KEY);
                  
                res
                  .cookie("usertoken", userToken, secret, {
                      httpOnly: true
                  })
                  .json({msg: "Registration & login successful!", user: user});
            })
            .catch(err => res.status(400).json(err))
    },
    login: async(req, res) => {
        const user = await User.findOne({emailAddress: req.body.emailAddress});
        
        if (user === null) {
            return res.status(400).json;
        }
        
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if (!correctPassword) {
            return res.status(400).json;
        }

        const payload = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            admin: user.admin,
          };
        const userToken = jwt.sign(payload, process.env.SECRET_KEY);

        res
          .cookie("usertoken", userToken, secret, {
              httpOnly: true
          })
          .json({msg: "Login successful!"});
    },
    logout: (req, res) => {
        res.clearCookie("usertoken");
        res.status(200).json({msg: "Logout successful!"});
    },
    read: (req, res) => {
        User.find({})
            .then(allUsers => res.json(allUsers))
            .catch(err => res.json(err))
    },
    readOne: (req, res) => {
        User.findOne({_id:req.params.id})
            .then(user => res.json(user))
            .catch(err => res.json(err))
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
