var express = require('express');
var router = express.Router();
<<<<<<< HEAD

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
=======
const cats = require('../data/cats.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', cats: cats }); // this is how you inject handlebars 
>>>>>>> f2c63cf... Working cat Shelter
});

module.exports = router;
