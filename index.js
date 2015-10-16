var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var routes = require('./routes');



app.set('views', './views');

app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);


app.listen(3000, function() {
	console.log('Listening on port 3000');
});