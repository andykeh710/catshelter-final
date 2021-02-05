var express = require('express');
var router = express.Router();
var fs = require('fs');
const path = require('path');
var formidable = require('formidable');
const cats = require('../data/cats.json');
const breeds = require('../data/breeds.json');
const catsPath = './data/cats.json';
var bodyParser = require('body-parser');
const globalPath = __dirname.toString().replace('routes', 'public');
/* GET edit-cat page. */
router.get('/:uid', function(req, res, next) {
    let uid = req.params.uid;
    console.log('uid --', uid);

    let theCat = cats[uid - 1]; 

    console.log('theCat---------------------------', theCat);
    let breedsSelected = [];
    breeds.forEach(b => {
        breedsSelected.push({
            breed: b,
            selected: (b===theCat.breed) ? true : false 
        });
    });
    res.render('edit-cat', { theCat: theCat, catBreeds: breedsSelected });
});
router.post('/:uid', function(req, res, next) {
    console.log('post edit-cat');
    let uid = req.params.uid;
    let form = formidable();
    //console.log('~form:', form);
    form.parse(req, (err, fields, files) => {
        console.log("antyhitng -=--------")
        if (err) {
            console.log(err);
        };
        console.log("FILES -----------", files)
        let theCat = cats[uid - 1]; 
        let imageName;
            imageName = files.myImg.name;
            let oldPath = files.myImg.path;
            const newPath = path.normalize(path.join(globalPath, './images/' + files.myImg.name));
            console.log('old path:', oldPath);
            console.log('new path:', newPath);
            fs.rename(oldPath, newPath, err => {
                if (err) throw err;
                console.log('files was uploaded successfully');
            });


       fs.readFile('./data/cats.json', 'utf-8', (err, data) => {
        if (err) {
          console.log(err)
          return
        }
        let editedCat = { id:uid, ...fields, image: imageName };
        console.log('updated cat info:', editedCat);
        //overwrite old cat obj with new edited cat obj
        cats[cats.indexOf(theCat)] = editedCat; 
        console.log('all-cats-edited', cats);
        let json = JSON.stringify(cats);
        fs.writeFile(catsPath, json, (err) => {
            if (err) throw err;
            res.redirect('/');
        });
    });
    // let editedCat = { id:uid, ...fields, image: imageName };
    //     console.log('updated cat info:', editedCat);

    //     //overwrite old cat obj with new edited cat obj
    //     cats[cats.indexOf(theCat)] = editedCat; 
    //     console.log('all-cats-edited', cats);
    //     let json = JSON.stringify(cats);

    //     fs.writeFile(catsPath, json, (err) => {
    //         if (err) throw err;
    //         res.redirect('/');
    //     });

    });
});
module.exports = router;