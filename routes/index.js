var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('add-breed', { title: 'FROGS breed form' });
});

module.exports = router;
