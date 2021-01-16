var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('add-breed', { title: 'FROGS breed form' }); /// add breed is the hbs template name, the rest is the objec to pass in 
});

module.exports = router;
