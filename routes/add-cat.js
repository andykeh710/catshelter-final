var express = require('express');
var router = express.Router();
const fs = require('fs');
let catBreeds = require('../data/breeds.json')
const formidable = require('formidable');
/* GET home page. */

router.get('/', function(req, res, next) {
  //console.log(catBreeds);
 
  res.render('add-cat', { title: 'Add Cat form', catBreeds: catBreeds}); /// add breed is the hbs template name, the rest is the objec to pass in 
});



router.post('/', (req, res, next) => {

  //console.log("the cat input is from-----------------------", res);
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
        if(err) {
        console.log(err)
        res.write(404);
        res.end();
      };

      let oldPath = files.upload.path;
      let newPath = ('C:\Users\Andy K\Desktop\CATSHLETER\public\images' + files.upload.name);
      let counter = [04,03,02,07,09,34,23,09,76,45,22,32,99,76,56,01,15,77,66,55];
      let catID = counter.shift();
      let catName = fields.name;
      let catDescription = fields.description;
      let catBreed = fields.breed;
      let newCatObj = {
        id: catID,
        name: catName,
        description: catDescription,
        breed: catBreed,
      }
      console.log(newCatObj);
      fs.rename(oldPath, newPath, (err) => {
        if(err) throw err;
        console.log("file was uploaded")
      });

      fs.readFile('./data/cats.json', 'utf8', (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(data)
          let currentCats = JSON.parse(data);
          console.log(currentCats);
          let newCat = req.body.cat;
          currentCats.push(newCat);
          let updatedCats = JSON.stringify(currentCats);
          console.log("UPDATED CATS -------------------", updatedCats);
      })
      fs.readFile
  })

 
})









module.exports = router;
