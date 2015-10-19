var express = require('express');
var router = express.Router();

var exec = require('child_process').exec;

//var cmd = 'casperjs casper-module/forms-duplicate-ids.js http://localhost:3000';

//var cmd = 'casperjs casper-module/linked-images.js ';
var out = {};
var url = '';
// exec(cmd, function(err, stdout, stderr) {
	
// 	out = JSON.parse(stdout);
// 	console.log(out);
// 	return out;

// });

router.get('/', function(req, res) {
	res.render('index', {
		title: 'Casper tests',
		messages: out
	});
});

router.get('/test-list', function(req, res) {
	res.render('test-list', {
		title: 'List of casper tests'
	});
});

router.post('/', function(req, res) {

	out = {};
	var cmd = '';
	var cmd = 'casperjs wcagtest.js ' + req.body.url + ' ' + req.body.number;

	console.log(cmd);

	exec(cmd, function(err, stdout, stderr) {

		if (err) {
			console.log(err);
			return;
		}
	
		out = JSON.parse(stdout);
		
		//out = stdout;

		console.log(out);

		display(out);
		return out;



	});

	
	function display(out) {
		res.render('results', {
			title: 'Results',
			messages: out
		});
	}

	
});

router.get('/images', function(req, res) {
	res.render('images', {
		title: 'Images test page',
		messages: 'test'
	});
});


module.exports = router;