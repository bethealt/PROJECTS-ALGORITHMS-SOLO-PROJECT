const UserController = require('../controllers/user.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = function(app){
    app.post('/api/users/register', UserController.register);
    app.post('/api/users/login', UserController.login);
    app.post('api/users/logout', authenticate, UserController.logout);
    app.get('/api/users', authenticate, UserController.read);
    app.get('/api/users/:id', authenticate, UserController.readOne);
    app.put('/api/users/update/:id', authenticate, UserController.update);
    app.delete('/api/users/delete/:id', authenticate, UserController.delete);
};