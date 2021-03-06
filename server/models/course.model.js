const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A course title is required."],
        minlength: [5, "A course title must have at least 5 characters."]
    },
    description: {
        type: String,
        required: [true, "A course description is required."],
        minlength: [5, "A course description must have at least 5 characters."]
    },
    date: {
        type: Date,
        required: [true, "Please select a date for the course."]
    },
    start: {
        type: String,
        required: [true, "Please select a start time for the course."]
    },
    end: {
        type: String,
        required: [true, "Please select an end time for the course."]
    },
    location: {
        type: String,
        required: [true, "Please enter a location for the course."],
        minlength: [5, "A course location must have at least 5 characters."]
    },
    streetAddress: {
        type: String,
        required: [true, "Please enter a street address for the course."],
        minlength: [5, "A street address must have at least 5 characters."]
    },
    city: {
        type: String,
        required: [true, "Please enter a city for the course."],
        minlength: [3, "A city must have at least 3 characters."]
    },
    state: {
        type: String,
        required: [true, "Please enter a state for the course."],
        maxlength: [2]
    },
    zipCode: {
        type: Number,
        required: [true, "Please enter a zip code for the course."],
        minlength: [5, "A zip code must have at least 5 digits."]
    },
    county: {
        type: String,
        required: [true, "Please select a county for the course."]
    },
    createdBy:{
        type: mongoose.Schema.Types.Mixed,
        ref: "User"
    }
}, {timestamps: true});

CourseSchema.plugin(uniqueValidator,{
    msg: 'Course already exists in the database.'});
    
module.exports = mongoose.model('Course', CourseSchema);

