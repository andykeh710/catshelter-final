var express = require('express');
var router = express.Router();
const fs = require('fs');
const catBreeds = require('../data/breeds.json');
const formidable = require('formidable');
const path = require('path');
const globalPath = __dirname.toString().replace('routes', 'public');
//console.log("GLOBAL PATH ------------------------------------", globalPath);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('add-cat', { title: 'Add cat form', catBreeds: catBreeds });
});

router.post('/', (req, res, next) => {
    console.log('someone clicked post');
    //console.log('the cat form input is', res);

    let form = new formidable.IncomingForm();

      form.parse(req, (err, fields, files) => {
        //console.log("FILES NAME ---------------------------------------------", files.upload.name);
        if (err) {
          console.log(err);
          return
        }
        const oldPath = files.upload.path;
        const newPath = path.normalize(path.join(globalPath, './images/' + files.upload.name));
        //console.log("NEW PATH -0-----------------------", newPath);

        fs.rename(oldPath, newPath, err => {
          if (err) { 
            console.log(err);
            return
          }
          console.log('Files were uploaded successfully');
        })




        
        fs.readFile('./data/cats.json', 'utf-8', (err, data) => {
          if (err) {
            console.log(err)
            return
          }

        const allCats = JSON.parse(data);
       // console.log("-------------------------ALLCATS HERE --------------------", allCats)
        //console.log()
        allCats.push({ id: allCats.length + 1, ...fields, image: files.upload.name});
        const json = JSON.stringify(allCats);

        fs.writeFile('./data/cats.json', json, () => { 
          res.writeHead(301, { location: '/'});
          res.end();
        });
      });
    });
})









module.exports = router;