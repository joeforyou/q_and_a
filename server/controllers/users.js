console.log('users controller loaded...')
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
	create: function(req, res){
		console.log('in create method of users controller: ', req.body)
		User.findOneAndUpdate({name: req.body.name}, req.body, {upsert: true}, function(err, doc){
    		if (err) { res.status(400).json(err) }
    		res.json(doc);
		});	
	}
}