console.log('question model loaded...')

var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
	text: String,
	description: String,
	_answers: [{type: mongoose.Schema.ObjectId, ref: 'Answer'}]
})

mongoose.model('Question', QuestionSchema);