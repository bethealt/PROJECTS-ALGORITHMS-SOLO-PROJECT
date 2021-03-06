const {User, Admin} = require('../server/models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register: (req, res) => {
        User.create(req.body)
            .then(user => {
                const payload = {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    admin: false,
                  };
                const userToken = jwt.sign(payload, process.env.JWT_SECRET_KEY1);
                  
                res
                  .cookie("usertoken", userToken, secret, {
                      httpOnly: true
                  })
                  .json({msg: "Registration & login successful!", user: user});
            })
            .catch(err => res.status(400).json(err))
    },

    registerAdmin: (req, res) => {
        Admin.create(req.body)
            .then(admin => {
                const payload = {
                    id: admin._id,
                    firstName: admin.firstName,
                    lastName: admin.lastName,
                    admin: true
                  };
                const adminToken = jwt.sign(payload, process.env.JWT_SECRET_KEY2);
                  
                res
                  .cookie("admintoken", adminToken, secret, {
                      httpOnly: true
                  })
                  .json({msg: "Registration & login successful!", admin: admin});
            })
            .catch(err => res.status(400).json(err))
    },

    login: async(req, res) => {
        const user = await User.findOne({emailAddress: req.body.emailAddress});
        if (user === null) {
            return res.status(400).json(err);
        }
        
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if (!correctPassword) {
            return res.status(400).json(err);
        }

        const payload = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            admin: user.admin,
          };
        const userToken = jwt.sign(payload, process.env.JWT_SECRET_KEY1);

        res
          .cookie("usertoken", userToken, secret1, {
              httpOnly: true
          })
          .json({msg: "Login successful."});
    },
    logout: (req, res) => {
        res.clearCookie("usertoken");
        res.status(200).json({msg: "Logout successful."});
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
