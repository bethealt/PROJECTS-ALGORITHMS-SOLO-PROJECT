const UserController = require('../controllers/user.controller');

module.exports = function(app){
    app.post('/api/users', UserController.create);
    app.get('/api/users', UserController.read);
    app.get('/api/users/:id', UserController.readOne);
    app.put('/api/edit/:id', UserController.update);
    app.delete('/api/users/:id', UserController.delete);
};