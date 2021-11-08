const User = require('../models/user.model');

module.exports = {
    create: (req, res) => {
        const {
            firstName, 
            lastName, 
            emailAddress, 
            birthDate, 
            zipcode,
            password, 
            courses} = req.body;
        User.create({
            firstName, 
            lastName, 
            emailAddress, 
            birthDate,
            zipcode, 
            password, 
            courses
        })
            .then(newUser => res.json(newUser))
            .catch(err => res.status(400).json(err))
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
