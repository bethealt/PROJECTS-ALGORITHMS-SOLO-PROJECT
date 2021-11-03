const CourseController = require('../controllers/course.controller');

module.exports = function(app){
    app.post('/api/courses', CourseController.create);
    app.get('/api/courses', CourseController.read);
    app.get('/api/courses/:id', CourseController.readOne);
    app.put('/api/courses/:id', CourseController.update);
    app.delete('/api/courses/:id', CourseController.delete);
};