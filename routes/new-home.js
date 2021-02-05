var express = require('express');
var router = express.Router();
var fs = require('fs');

const cats = require('../data/cats.json');
//const breeds = require('../data/breeds.json');
const catsPath = './data/cats.json';

/* GET new-home page. */
console.log("SOMETHIHGNGG ssssss------------")
router.get('/:uid', function(req, res, next) {
    console.log('get new-home');
    let uid = req.params.uid;
    console.log('uid', uid);
    //console.log(cats);

    let theCat = cats[uid -1]; 

    console.log('theCatgsffgagasfdsgadfgsda', theCat);

    
    res.render('new-home', { theCat: theCat });
});

router.post('/:uid', function(req, res, next) {
    console.log('post new-home');

    let uid = req.params.uid;

let theCat = cats[uid -1]; 
    console.log('theCata:---------------------------', theCat);
    console.log('indexOf', cats.indexOf(theCat));

    cats.splice(cats.indexOf(theCat), 1);
    console.log('all-cats-after-delete', cats);
    let json = JSON.stringify(cats);

    fs.writeFile(catsPath, json, (err) => {
        if (err) throw err;
        res.redirect('/');
    });

});

module.exports = router;