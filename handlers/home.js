const url = require('url');
const fs = require('fs'); // File System
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require ('../data/breeds.json'); // Imported the breeds json so we can use it! 
const cats = require('../data/cats.json');
const { request } = require('http');
const globalPath = __dirname.toString().replace('routes', '');


module.exports = (req, res) => {
  console.log("HOME GLOBAL PATH ------------------------------", globalPath);
  const pathname = url.parse(req.url).pathname;
  console.log("[home.js 10]home pathname is ", pathname);
  if (pathname === '/' && req.method === 'GET') {
    // Implement the logic for showing the home html view
    let filePath = path.normalize(
      path.join(__dirname, '../views/home/index.html')
    );
    fs.readFile(filePath, (err, data) => {
      let modifiedCats = cats.map((cat) =>  `<li>
        <img src="${path.join('./content/images' + cat.image)}" alt="${cat.name}"></img>
        <h3>${cat.name}</h3>
        <p><span>Breed: </span>${cat.breed}</p>
        <p><span>Description: </span>${cat.description}</p>
        <ul class="buttons">
          <li class="btn edit"><a href="/edit-cat/${cat.id}">Change Info</a></li>
          <li class="btn delete"><a href="cats-find-new-home/${cat.id}">New Home</a></li>
          </ul>
      </li>`);
      let modifiedData = data.toString().replace('{{cats}}', modifiedCats);

      if(err) {
        console.log(err);
        res.write(404, {
          "Content-Type": "text/plain"
        });
        res.write(404);
        res.end();
        return
      } 
      res.writeHead(200, {
        "Content-Type": "text/html" 
      });
      res.write(modifiedData);
      res.end();
    });


  } 
  else {
    return true;
  }
} 
