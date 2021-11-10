const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
    time: {
        type: Number,
        required: [true, "Please select a time for the course."]
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

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "A first name is required."],
        minlength: [2, "A first name must have at least 2 characters."] 
    },
    lastName: {
        type: String,
        required: [true, "A last name is required."],
        minlength: [2, "A last name must have at least 2 characters."]
    },
    emailAddress: {
        type: String,
        required: [true, "An email is required."],
        minlength: [3, "An email must have at least 3 characters."],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Enter a valid email."
        }
    },
    birthDate: {
        type: Date,
        required: [true, "Please indicate your birth date."],
        min: [1931-01-01, "You must be no more than 90 years old to register for a course."],
        max: [2008-01-01, "You must be at least 13 years old to register for a course."],
    },
    zipcode: {
        type: Number,
        required: [true, "A zip code is required."],
        minlength: [5, "A zipcode must have at least 5 characters."]
    },
    password: {
        type: String,
        required: [true, "A password is required."],
        minlength: [8, "A password must have at least 8 characters."],
    },
    admin: {
        type: Boolean,
        default: false,
    },
    courses: [CourseSchema]
}, {timestamps: true});

UserSchema.plugin(uniqueValidator,{
    msg: 'User already exists in the database.'});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next();
      });
  });
  
UserSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
}
next();
});
  
module.exports = mongoose.model('User', UserSchema);