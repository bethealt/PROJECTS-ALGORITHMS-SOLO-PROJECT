const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        required: [true, "A birth date is required."]
    },
    password: {
        type: String,
        required: [true, "A password is required."],
        minlength: [8, "A password must have at least 8 characters."],
    },
    courses: [CourseSchema]
}, {timestamps: true});

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