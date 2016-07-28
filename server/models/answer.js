console.log('answer model loaded...')

var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
	name: String,
	text: String,
	details: String,
	likes: Number,
	_question: [{type: mongoose.Schema.ObjectId, ref: 'Question'}]
})

mongoose.model('Answer', AnswerSchema);