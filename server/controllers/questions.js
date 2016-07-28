console.log('questions controller loaded...')
var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');
module.exports = {
	create: function(req, res){
		console.log('posting to /questions', req.body);
		Question.create(req.body, function(err, question){
			if(err){
				res.status(400).json(err)
			}
			res.json(question);
		})
	},
	index: function(req, res){
		console.log('listing all the questions in the questions controller index');
		Question.find({}, function(err, questions){
			if(err){
				res.status(400).json(err)
			}
			res.json(questions);
		})
	},
	show: function(req, res){
		console.log('showing /questions/'+req.params.id);
		Question.findOne({_id: req.params.id}).populate("_answers").exec(function(err, question){
			if(err){
				res.status(400).json(err)
			}
			res.json(question);
		})
	},
	answer: function(req, res){
		console.log('in the answer method of the questions controller')
		Question.findOne({_id: req.params.id}, function(err, question){
			if(err){
				res.status(400).json(err)
			}
			else{
				var answer = new Answer (req.body)
				answer._question = question._id;
				question._answers.push(answer);
				answer.save(function(err, answer){
					if(err){
						console.log(err);
						res.status(400).json(err)
					} else {
						question.save(function(err, question){
							if(err){
								res.status(400).json(err);
							}
							res.json(question)
						})
					}
				})
			}
		})
	},
	update: function(req, res){
		console.log('in the update of questions controller!!!', req.body, req.params.id)
		Answer.findOneAndUpdate({_id: req.params.id}, req.body, function(err, answer){
			if(err){
				res.status(400).json(err)
			}
			res.json(answer);
		})
	}
}