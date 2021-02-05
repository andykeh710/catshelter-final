const url = require('url');
const fs = require('fs'); // File System
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require ('../data/breeds.json'); // Imported the breeds json so we can use it! 
const cats = require('../data/cats.json');
<<<<<<< HEAD

module.exports = (req, res) => {
=======
const { request } = require('http');
const globalPath = __dirname.toString().replace('routes', '');


module.exports = (req, res) => {
  console.log("HOME GLOBAL PATH ------------------------------", globalPath);
>>>>>>> f2c63cf... Working cat Shelter
  const pathname = url.parse(req.url).pathname;
  console.log("[home.js 10]home pathname is ", pathname);
  if (pathname === '/' && req.method === 'GET') {
    // Implement the logic for showing the home html view
    let filePath = path.normalize(
      path.join(__dirname, '../views/home/index.html')
    );
    fs.readFile(filePath, (err, data) => {
<<<<<<< HEAD
=======
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

>>>>>>> f2c63cf... Working cat Shelter
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
<<<<<<< HEAD
      res.write(data);
      res.end();
    });

  } else if (pathname === '/cats/add-cat' && req.method === 'GET') {
    let filePath = path.normalize(path.join(__dirname, '../views/addCat.html'));

    const index = fs.createReadStream(filePath);

    index.on('data', (data) => {
      console.log("the breeds are currently ", breeds)
      let catBreedPlaceHolder = breeds.map( (breed) => `<option value"${breed}">${breed}</option>`);
      console.log(catBreedPlaceHolder)
      let modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceHolder)
                                            //         	<option value="Fluffy Cat">Fluffy Cat</option>
      res.write(modifiedData)
    });
    index.on('end', () => {
      res.end();
    })
    index.on('error', (err) => {
      console.log(err);
    })

  } else if (pathname === '/cats/add-breed' && req.method === 'GET') {
    let filePath = path.normalize(path.join(__dirname, '../views/addBreed.html'));

    const index = fs.createReadStream(filePath);

    index.on('data', (data) => {
      res.write(data);
    });
    index.on('end', () => {
      res.end();
    })
    index.on('error', (err) => {
      console.log(err);
    })
  } else if (pathname === '/cats/add-cat' && req.method === 'POST') {
        let filePath = path.normalize(path.join(__dirname, '../views/addcat.html'));
        const index = fs.createReadStream(filePath);
        let form = new formidable.IncomingForm();
        // console.log(form);
       
        form.parse(req, (err, fields, files) => {
          if (err) throw err;
    
          let oldPath = files.upload.path;
          let newPath = path.normalize(path.join("../content/images/", files.upload.name));
          console.log("OLD PATH----------------", oldPath);
          console.log("NEWPATH  _______________", newPath)
          fs.rename(oldPath, newPath, (err) =>{
            if(err) throw err;
            console.log('files were uploaded successfully ')
          });
    
        fs.readFile('./data/cats.json', 'utf8', (err, data) => {
      console.log("THIS IS DATA   ----------------------", data)
          let allCats = JSON.parse(data);
          let newId = oldPath.match(/[\A-Za-z0-9]+$/g)[0];
    
          allCats.push({id:newId, ...fields, image: files.upload.name});
          let json = JSON.stringify(allCats);
          fs.writeFile('./data/cats.json', json, () => {
            res.writeHead(202, {location: '/'});
            res.end();
          });
        });
      });
        index.on('data', (data) => {
          res.write(data);
        });
        index.on('end', () => {
          res.end();
        })
        index.on('error', (err) => {
          console.log(err);
        })
    
      } else if (pathname === '/cats/add-breed' && req.method === 'POST') {
        let formData = "";
    
        req.on('data', (data) => {
          //console.log("the breed form data is ", data.toString());
          formData += data
          // console.log("the new data is ", formData)
          // console.log('I want the form data to be just "testing"')
          let parsedData = qs.parse(formData);
          // console.log("the parsed data is ", parsedData.breed)  // 
    
          fs.readFile("./data/breeds.json", 'utf8' , (err, data) => {
            if (err) {
              console.error(err)
              return
            }
    
            //console.log('the raw parse data is ', data)
            let currentBreeds = JSON.parse(data); /// TURNS INTO PARSED DATA 
            currentBreeds.push(parsedData.breed);
            console.log("the breeds.json parsed data is the varible currentBreeds " ,currentBreeds);
            let updatedBreeds = JSON.stringify(currentBreeds); /// stringafy turns parsed data into JSON 
            // console.log("JSON updated ready to save updated breeds", updatedBreeds);
    
            fs.writeFile('./data/breeds.json', updatedBreeds, 'utf-8', (err) => {
              if (err) {
                console.log(err)
              }
              console.log("The breed was uploaded successfully...")
            })
    
            res.writeHead(301, { location: '/'});
            res.end();
    
          })
        });
      } else {
        return true;
      }
    } 


// const url = require('url');
// const fs = require('fs'); // File System
// const path = require('path');
// const qs = require('querystring');
// const formidable = require('formidable'); /// import library 
// const breeds = require ('../data/breeds.json'); // Imported the breeds json so we can use it! 
// const cats = require('../data/cats.json');
// const { reduce } = require('.');

// module.exports = (req, res) => {
//   const pathname = url.parse(req.url).pathname;
//   console.log("[home.js 10]home pathname is ", pathname);
//   if (pathname === '/' && req.method === 'GET') {
//     // Implement the logic for showing the home html view
//     let filePath = path.normalize(
//       path.join(__dirname, '../views/home/index.html')
//     );
//     fs.readFile(filePath, (err, data) => {
//       let modifiedCats = cats.map((cat) => `<li>
//       <img src="${path.join('/content/images' + files.upload.name)}" alt="${cat.name}">
//       <h3>${car.name}</h3>
//       <p><span>Breed: </span>${cat.breed}</p>
//       <p><span>Description: </span>${cat.description}</p>
//       <ul class="buttons">
//       <li class="btn edit"><a href="/${cat.id}">Change Info</a></li>
//       <li class="btn delete"><a href="/cats-find-new-home/${cat.id}">New Home</a></li>
//       </ul>`);
//       let modifiedData = data.toString().replace('{{cats}}', modifiedCats);
//       console.log('the modified data ios ', modifiedData);

//       if(err) {
//         console.log(err);
//         res.write(404, {
//           "Content-Type": "text/plain"
//         });
//         res.write(404);
//         res.end();
//         return
//       } 
//       res.writeHead(200, {
//         "Content-Type": "text/html" 
//       });
//       res.write(data);
//       res.end();
//     });

//   } else if (pathname === '/cats/add-cat' && req.method === 'GET') {
//     let filePath = path.normalize(path.join(__dirname, '../views/addCat.html'));

//     const index = fs.createReadStream(filePath);

//     index.on('data', (data) => {
//      // console.log("the breeds are currently ", breeds)
//       let catBreedPlaceHolder = breeds.map( (breed) => `<option value"${breed}">${breed}</option>`);
//      // console.log(catBreedPlaceHolder)
//       let modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceHolder)
//                                             //         	<option value="Fluffy Cat">Fluffy Cat</option>
//       res.write(modifiedData)
//     });
//     index.on('end', () => {
//       res.end();
//     })
//     index.on('error', (err) => {
//       console.log(err);
//     })

//   } else if (pathname === '/cats/add-breed' && req.method === 'GET') {
//     let filePath = path.normalize(path.join(__dirname, '../views/addBreed.html'));

//     const index = fs.createReadStream(filePath);

//     index.on('data', (data) => {
//       res.write(data);
//     });
//     index.on('end', () => {
//       res.end();
//     })
//     index.on('error', (err) => {
//       console.log(err);
//     })
//   } else if (pathname === '/cats/add-cat' && req.method === 'POST') {
//     let filePath = path.normalize(path.join(__dirname, '../views/addcat.html'));
//     const index = fs.createReadStream(filePath);
//     let form = new formidable.IncomingForm();
//     // console.log(form);
   
//     form.parse(req, (err, fields, files) => {
//       if (err) throw err;

//       let oldPath = files.upload.path;
//       let newPath = path.normalize(path.join("../content/images/", files.upload.name));
//       console.log("OLD PATH----------------", oldPath);
//       console.log("NEWPATH  _______________", newPath)
//       fs.rename(oldPath, newPath, (err) =>{
//         if(err) throw err;
//         console.log('files were uploaded successfully ')
//       });

//     fs.readFile('./data/cats.json', 'utf8', (err, data) => {
//   console.log("THIS IS DATA   ----------------------", data)
//       let allCats = JSON.parse(data);
//       let newId = oldPath.match(/[\A-Za-z0-9]+$/g)[0];

//       allCats.push({id:newId, ...fields, image: files.upload.name});
//       let json = JSON.stringify(allCats);
//       fs.writeFile('./data/cats.json', json, () => {
//         res.writeHead(202, {location: '/'});
//         res.end();
//       });
//     });
//   });
//     index.on('data', (data) => {
//       res.write(data);
//     });
//     index.on('end', () => {
//       res.end();
//     })
//     index.on('error', (err) => {
//       console.log(err);
//     })

//   } else if (pathname === '/cats/add-breed' && req.method === 'POST') {
//     let formData = "";

//     req.on('data', (data) => {
//       //console.log("the breed form data is ", data.toString());
//       formData += data
//       // console.log("the new data is ", formData)
//       // console.log('I want the form data to be just "testing"')
//       let parsedData = qs.parse(formData);
//       // console.log("the parsed data is ", parsedData.breed)  // 

//       fs.readFile("./data/breeds.json", 'utf8' , (err, data) => {
//         if (err) {
//           console.error(err)
//           return
//         }

//         //console.log('the raw parse data is ', data)
//         let currentBreeds = JSON.parse(data); /// TURNS INTO PARSED DATA 
//         currentBreeds.push(parsedData.breed);
//         console.log("the breeds.json parsed data is the varible currentBreeds " ,currentBreeds);
//         let updatedBreeds = JSON.stringify(currentBreeds); /// stringafy turns parsed data into JSON 
//         // console.log("JSON updated ready to save updated breeds", updatedBreeds);

//         fs.writeFile('./data/breeds.json', updatedBreeds, 'utf-8', (err) => {
//           if (err) {
//             console.log(err)
//           }
//           console.log("The breed was uploaded successfully...")
//         })

//         res.writeHead(301, { location: '/'});
//         res.end();

//       })
//     });
//   } else {
//     return true;
//   }
// } 
// // const url = require('url');
// // const fs = require('fs');
// // const path = require('path');
// // const qs = require('querystring');
// // const formidable = require('formidable');
// // const breeds = require ('../data/breeds.json');
// // const cats = require('../data/cats.json');



// // module.exports = (req, res) => {
// //   const pathname = url.parse(req.url).pathname;
// //   console.log("[home.js 10]home pathname is ", pathname);
// //   if (pathname === '/' && req.method === 'GET') {
// //     // Implement the logic for showing the home html view
// //     let filePath = path.normalize(
// //       path.join(__dirname, '../views/home/index.html')
// //     );
// //     fs.readFile(filePath, (err, data) => {
// //       if(err) {
// //         console.log(err);
// //         res.write(404, {
// //           "Content-Type": "text/plain"
// //         });
// //         res.write(404);
// //         res.end();
// //         return
// //       } 
// //       res.writeHead(200, {
// //         "Content-Type": "text/html" 
// //       });
// //       res.write(data);
// //       res.end();
// //     });

// //   } else if (pathname === '/cats/add-cat' && req.method ==="GET"){
// //       let filePath = path.normalize(path.join(__dirname, '../views/addCat.html'));

// //       const index = fs.createReadStream(filePath)  // read page and set to this variabl;e

// //       index.on('data', (data) => {
// //         console.log("the breeds are  ", breeds );
// //         let catBreedPlaceHolder = breeds.map( (breed) => `<option value"${breed}">${breed}</option>`);
// //         let modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceHolder)


// //           res.write(modifiedData);
// //       });
// //       index.on('end', () => {
// //           res.end();
// //       })
// //       index.on('error', () => {
// //           console.log("error");
// //       })
      
// //   }   else if (pathname === '/cats/add-breed' && req.method === 'GET') {
// //       let filePath = path.normalize(path.join(__dirname, '../views/addBreed.html'));

// //       const index = fs.createReadStream(filePath)  // read page and set to this variabl;e

// //       index.on('data', (data) => {
// //           res.write(data);
// //       });
// //       index.on('end', () => {
// //           res.end();
// //       })
// //       index.on('error', () => {
// //           console.log("error");
// //       })


// //   } else if (pathname === '/cats/add-breed' && req.method === 'POST') {
// //   let formData = "";

// //     req.on('data', (data) => {
// //       console.log("the breed form data is ", data.toString());
// //       formData += data;
// //       console.log("the new data is ", formData);
// //       let parsedData = qs.parse(formData);
// //       console.log(parsedData.breed)
// //       -

// // fs.readFile("./data/breeds.json", 'utf8', (err, data)=> {
// //   if (err){
// //     console.log(err)
// //   return
// //   }
// //   console.log("the breeds json data is ", data)
// //   let currentBreeds = JSON.parse(data);
// //   console.log("This is the current", currentBreeds);
// //   currentBreeds.push(parsedData.breed);

// //   console.log(currentBreeds)

// //   let updatedBreeds = JSON.stringify(currentBreeds)

// //   fs.writeFile('./data/breeds.json', updatedBreeds, 'utf-8', () => {
// //     console.log("the breed was uploaded success ")
// //   })
// //   res.writeHead(302, { location: '/'});
// //   res.end()
// // });


// // });
// // } else {
// //     return true;
// //   }
// // } 
=======
      res.write(modifiedData);
      res.end();
    });


  } 
  else {
    return true;
  }
} 
>>>>>>> f2c63cf... Working cat Shelter
