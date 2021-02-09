var express = require('express');
var router = express.Router();
const cats = require('../data/cats.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', cats: cats }); // this is how you inject handlebars 
});

module.exports = router;
