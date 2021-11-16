const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

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
        unique: [true, "This email already exists in the database."], 
        minlength: [3, "An email must have at least 3 characters."],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Enter a valid email."
        }
    },
    birthDate: {
        type: Date,
        required: [true, "Please indicate your birth date."],
        max: [2008-01-01, "You must be at least 13 years old to register for a course."],
    },
    zipCode: {
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
    }
}, {timestamps: true});

UserSchema.plugin(uniqueValidator,{
    msg: 'This email already exists in the database.'});

//confirmPassword is a virtual field that holds data from the request, but it is not saved to the db.
//password is saved to the database only once
UserSchema.virtual('confirmPassword')
  .get(() => this._confirmPassword )
  .set((value) => this._confirmPassword = value);

//Middleware interrupts a process, performs some work, and then continues on to the NEXT step/function of the process
UserSchema.pre('validate', function(next) {
if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Passwords do not match. Please correct.');
}
next();
});

//encrypts the confirmed password before it is saved to the db.
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hashedPWD => {
        //update the password (in this instance) to the hashed, returned version
        this.password = hashedPWD;
        next();
      })
      .catch((err) => {
          console.log('An error occurred while hashing the password.');
      });
});


//mongoose creates a db collection with a lowercase & plural conversion of User/Admin
module.exports = mongoose.model('User', UserSchema);
