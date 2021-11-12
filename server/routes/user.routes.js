const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app){
    app.post('/api/users/register', authenticate, UserController.register);
    app.post('/api/users/login', authenticate, UserController.login);
    app.post('api/users/logout', authenticate, UserController.logout);
    app.get('/api/users', authenticate, UserController.read);
    app.get('/api/users/:id', authenticate, UserController.readOne);
    app.put('/api/users/update/:id', authenticate, UserController.update);
    app.delete('/api/users/:id', authenticate, UserController.delete);
};