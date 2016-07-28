//dependencies
var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');
var port = 8000;

var app = express();
//configure app

app.use(express.static(path.join(__dirname, "client")));
app.use(express.static(path.join(__dirname, "bower_components")));
app.use(bodyParser.json());

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(port, function(){
  console.log("Belt Exam (take 2) on port: "+port);
})