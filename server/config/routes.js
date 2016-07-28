console.log("modular routes loaded...")
var users = require('../controllers/users.js');
var questions = require('../controllers/questions.js');
module.exports = function(app){
	app.post('/users', users.create);
	app.post('/questions', questions.create);
	app.get('/questions', questions.index);
	app.get('/questions/:id', questions.show);
	app.post('/questions/:id/answer', questions.answer);
	app.put('/answers/:id', questions.update);
}