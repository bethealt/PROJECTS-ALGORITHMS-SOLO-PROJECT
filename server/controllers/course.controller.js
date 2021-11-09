const Course = require('../models/course.model');

module.exports = {
    create: (req, res) => {
        const {
            title, 
            description,
            date,
            time,
            location,
            streetAddress,
            city,
            zipCode,
            county
        } = req.body;
        Course.create(req.body)
            .then(newCourse => res.json(newCourse))
            .catch(err => res.status(400).json(err))
    },
    read: (req, res) => {
        Course.find({})
            .then(allCourses => res.json(allCourses))
            .catch(err => res.json(err))
    },
    readOne: (req, res) => {
        Course.findOne({_id:req.params.id})
            .then(course => res.json(course))
            .catch(err => res.json(err))
    },
    update: (req, res) => {
        Course.findOneAndUpdate(
            {_id:req.params.id}, req.body,
            {new:true, runValidators:true, context: 'query'})
                .then(updateCourse => res.json(updateCourse))
    },
    delete: (req, res) => {
        Course.deleteOne({_id:req.params.id})
            .then(deleteConfirmation => res.json(deleteConfirmation))
            .catch(err => res.json(err))
    }
}


