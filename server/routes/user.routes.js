const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app){
    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);
    app.put('api/users/logout', UserController.logout);
    app.get('/api/users', authenticate, UserController.read);
    app.get('/api/users/:id', authenticate, UserController.readOne);
    app.put('/api/edit/:id', UserController.update);
    app.delete('/api/users/:id', UserController.delete);
};