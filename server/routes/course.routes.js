const CourseController = require('../controllers/course.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app){
    app.post('/api/courses', authenticate, CourseController.create);
    app.get('/api/courses', authenticate, CourseController.read);
    app.get('/api/courses/:id',authenticate, CourseController.readOne);
    app.put('/api/courses/:id', authenticate, CourseController.update);
    app.delete('/api/courses/:id', authenticate, CourseController.delete);
};