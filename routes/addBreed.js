var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('add-breed', { title: 'FROG' }); /// add breed is the hbs template name, the rest is the objec to pass in 
});



router.post('/', (req, res, next) => {
    if (err) {
        console.error(err)
        return
    }
    let newbreed = req.body.breed;
    let currentBreeds = JSON.parse(data)
    fs.readFile
})









module.exports = router;
