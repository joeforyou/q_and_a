console.log('user model loaded...')

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: String
})

mongoose.model('User', UserSchema);