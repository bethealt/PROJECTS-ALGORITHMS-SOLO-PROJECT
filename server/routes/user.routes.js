const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app){
    app.post('/api/register', authenticate, UserController.register);
    app.post('/api/login', authenticate, UserController.login);
    app.put('api/users/logout', authenticate, UserController.logout);
    app.get('/api/users', authenticate, UserController.read);
    app.get('/api/users/:id', authenticate, UserController.readOne);
    app.put('/api/edit/:id', authenticate, UserController.update);
    app.delete('/api/users/:id', authenticate, UserController.delete);
};