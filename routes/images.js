var express = require('express');
var router = express.Router();

router.get('/images', function(req, res) {
	res.send('images.jade');
});

module.exports = router;