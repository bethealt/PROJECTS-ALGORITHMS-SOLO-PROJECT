const UserController = require('../controllers/user.controller');

module.exports = function(app){
    app.post('/api/users/register', UserController.register);
    app.post('/api/users/login', UserController.login);
    app.post('api/users/logout', UserController.logout);
    app.get('/api/users', UserController.read);
    app.get('/api/users/:id', UserController.readOne);
    app.put('/api/users/update/:id', UserController.update);
    app.delete('/api/users/:id', UserController.delete);
};