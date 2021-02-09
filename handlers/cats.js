const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require ('../data/breeds.json');
const cats = require('../data/cats.json');

module.exports = (req, res) => {
  const pathname = url.parse(req.url).pathname;
  if (pathname === '/cats/add-cat' && req.method === 'GET') {


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
    });
    index.on('error', (err) => {
      console.log(err);
    });


  }  else if (pathname === '/cats/add-cat' && req.method === 'POST') {
    let form = new formidable.IncomingForm();

      form.parse(req, (err, fields, files) => {
        console.log(files.upload.name);
        if (err) {
          console.log(err);
          res.write(404);
          res.end();
        }
        // console.log("the fields are ===============================================================", fields);
        // console.log("the files are -=-----------------------------------------------------------", files);
        const oldPath = files.upload.path;
        const newPath = path.normalize(path.join('./content/images' + files.upload.name));

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
        allCats.push({ id: cats.length + 1, ...fields, image: files.upload.name});
        const json = JSON.stringify(allCats);

        fs.writeFile('./data/cats.json', json, () => { 
          res.writeHead(301, { location: '/'});
          res.end();
        });
      });
    });

  
  } else if (pathname === '/cats/add-breed' && req.method === 'GET') {
    let filePath = path.normalize(path.join(__dirname, '../views/addBreed.html'));

    const index = fs.createReadStream(filePath);

    index.on('data', (data) => {
      res.write(data);
    });
    index.on('end', () => {
      res.end();
    });
    index.on('error', (err) => {
      console.log(err);
    });


  } else if (pathname === '/cats/add-breed' && req.method === 'POST') {
    let formData = "";

    req.on('data', (data) => {
      //console.log("the breed form data is ", data.toString());
      formData += data
      //console.log("the new data is ", formData)
      //console.log('I want the form data to be just "testing"')
      let parsedData = qs.parse(formData);
      //console.log("the parsed data is ", parsedData.breed)

      fs.readFile("./data/breeds.json", 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        let currentBreeds = JSON.parse(data);
        currentBreeds.push(parsedData.breed);
        //console.log("the breeds.json parsed data is the varible currentBreeds " ,currentBreeds);
        let updatedBreeds = JSON.stringify(currentBreeds);
        //console.log("JSON updated ready to save updated breeds", updatedBreeds);

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


  } else if (pathname.includes('/cats-edit/') && req.method === "GET") {
      let filePath = path.normalize(path.join(__dirname, '../views/editCat.html'));
    
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.write('404 File not found');
          res.end();
          return;
        }
        const index = fs.createReadStream(filepath);
        const id = pathname.split('/').pop();
        let newId = Number(id) - 1;

        console.log(pathname);
        console.log(id);
        const cat = cats.find((cat) => cat.id === id);
        console.log("SOMETHING -----------------------", cat);
        
        console.log(cats);
        let editForm = `<form action="/edit-cat/${id}" method="POST" class="cat-form" enctype="multipart/form-data">
        <h2>Edit Cat</h2>
        <label for="name">Name</label>
        <input name="name" type="text" id="name" value="${cats[newId].name}">
        <label for="description">Description</label>
        <textarea name="description" id="description">${cats[newId].description}</textarea>
        <label for="image">Image</label>
        <input name="upload" type="file" id="image">
        <label for="group">Breed</label>
        <select name="breed" id="group">
          {{catBreeds}} 
        </select>
        <button type="submit">Submit</button>
        </form>`
        const placeholder = breeds.map(breed => `<option value="${breed}">${breed}</option>`);
        editForm = editForm.replace('{{catBreeds}}', placeholder);

        const modifiedData = data.toString().replace('{{edit}}', editForm);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(modifiedData);
        res.end();  
      });


      //const index = fs.createReadStream(filePath);

      // index.on('data', (data) => {
      //   // console.log(data);
      //   // let currentCat = JSON.parse(data);
      //   // console.log(currentCat);
      //   // currentCat.push(parsedData);
      //   // let updatedCat = JSON.stringify(currentCat);
      //   // console.log(updatedCat);
      //   // let catBreedPlaceHolder = breeds.map( (breed) => `<option value"${breed}">${breed}</option>`);

      //   let catId = 1;
      //   let modifiedData = data.toString().replace('{{id}}', catId);
      //   modifiedData = modifiedData.replace('{{name}}', currentCat.name);
      //   modifiedData = modifiedData.replace('{{description}}', currentCat.description);

      //   const breedsAsOptions = breeds.map((b) => `<option value="${b}">${b}</option>`);
      //   modifiedData = modifiedData.replace('{{catBreeds}}', breedsAsOptions.join('/'));

      //   modifiedData = modifiedData.replace('{{breed}}', currentCat.breed);

      //   res.write(modifiedData)
      // });
      // index.on('end', () => { 
      //   res.end();
      // });
      // index.on('error', (err) => {
      //   console.log(err);
      // });
      const index = fs.createReadStream(filepath);

      index.on('data', (data) => {
          //console.log('req', req, '\nres', res);
          
          let newId = req.url.match(/[\A-Za-z0-9]+$/g)[0];    //get id from url
          console.log('new id',newId);

          let currentCat = search(cats, newId);

          let modifiedData = data.toString().replace('{{catId}}', newId);
          modifiedData = modifiedData.replace('{{name}}', currentCat.name);
          modifiedData = modifiedData.replace('{{description}}', currentCat.description);

          const breedsAsOptions = breeds.map((b) => `<option value="${b}">${b}</option>`);
          modifiedData = modifiedData.replace('{{catBreeds}}', breedsAsOptions.join('/'));

          modifiedData = modifiedData.replace(`<option value="${currentCat.breed}">`, `<option value="${currentCat.breed}" selected>`);   //select breed
          res.write(modifiedData);
      });

      index.on('end', () => {
          res.end();
      });

      index.on('error', (err) => {
          console.log(err);
      });

  } else if (pathname.includes('/cats-edit/') && req.method === "POST") {
    // let id = pathname.match(/[\A-Za-z0-9]+$/g)[0];
    // let form = new formidable.IncomingForm();
    // console.log("THIS IS FORM ---------", form);
    // form.parse(req, (err, fields, files) => {
    //   console.log(fields);
    //   console.log(files.upload.name);
    //   if (err) {
    //     console.log(err);
    //     return
    //   }
    //   const oldPath = files.upload.path;
    //   //console.log(oldPath);
    //   console.log(files);
    //   const newPath = path.normalize(path.join(globalPath, `/content/images/${files.upload.name}`));
    //   console.log("NEW PATH  HOME ==============", newPath);
    //   fs.rename(oldPath, newPath, err => {
    //     if (err) {
    //       console.log(err)
    //       return
    //     }
    //     console.log(`Image successfully uploaded to: ${newPath}`);
    //   });
 
    //   fs.readFile('./data/cats.json', 'utf-8', (err, data) => {
    //     if (err) {
    //       console.log(err);
    //       return
    //     }

    //     const id = pathname.split('/').pop();
    //     let allCats = JSON.parse(data); // DATA IS DATA ABOUT CAT INPUT IN THE FORM 
    //     console.log("ALL  CATS ------" + allCats)
    //     for (const cat of allCats) {
    //       if (cat.id === id) {
    //         cat.name = fields.name;
    //         cat.description = fields.description;
    //         cat.breed = fields.breed;
    //         cat.image = files.upload.name;
    //       }
    //     };


    //     const json = JSON.stringify(allCats);
    //     fs.writeFile('./data/cats.json', json, (err) => {
    //       if (err) {
    //         console.log(err);
    //         return;
    //       }
    //       console.log(`-----------------------------------------Cat ID:${id} successfully edited!`);
    //     })
    //   })
    //   res.writeHead(301, { 'location': '/' });
    //   res.end();
    // })
    let id = pathname.match(/[\A-Za-z0-9]+$/g)[0];
    console.log('aMNnything ------------------------');
    //console.log('~req:', req);
    let form = new formidable.IncomingForm();
    //console.log('~form:', form);

    form.parse(req, (err, fields, files) => {
        if (err) throw err;
        console.log('~fields:', fields);
        console.log('~files:', files);

        fs.readFile('./data/cats.json', 'utf-8', (err, data) => {
            if (err) throw err;

            let allCats = JSON.parse(data); 
            let thisCat;
            let thisCatIndex;
            
            for (let i = 0; i < allCats.length; i++) {      
                if (allCats[i].id === id) {
                    thisCat = allCats[i];
                    thisCatIndex = i;
                }
            }
            console.log('all cats:', allCats);
            console.log('old data:', thisCat);
            let editedCat = {};
            let keys = Object.keys(fields);
            console.log('fields-keys:', keys);

            editedCat.id = id;    //id wasn't included in form so add it here
            for (let i = 0; i < keys.length; i++) { //add keys from fields (file is excluded, we add file next)
                if (thisCat[keys[i]] !== fields[keys[i]]) {
                    if (fields[keys[i]] !== undefined) {
                        editedCat[keys[i]] = fields[keys[i]];
                        console.log('~~~ updated', keys[i]);

                    }
                } else {
                    editedCat[keys[i]] = thisCat[keys[i]];
                    console.log('~~~ carryover', keys[i]);

                }
            }

            
            if (files.upload.name === '' || thisCat.image === files.upload.name) {
                editedCat.image = thisCat.image;      //copy over last image to new image

            } else {
                //process new file
                editedCat.image = files.upload.name;

                let oldPath = files.upload.path;
                let newPath = path.normalize(path.join(__dirname, "../content/images/" + files.upload.name));
                console.log('old path:', oldPath);
                console.log('new path:', newPath);
                // console.log('typeof:', typeof oldPath);

                fs.rename(oldPath, newPath, (err) => {
                    if (err) throw err;
                    console.log('files was uploaded successfully');
                });
                
            }
            

            //write file with new data

            console.log('updated cat info:', editedCat);
            console.log('indexOf', allCats.indexOf(thisCat));
            allCats[allCats.indexOf(thisCat)]= editedCat; //overwrite last cat object with new edited cat object
            let json = JSON.stringify(allCats);
            fs.writeFile('./data/cats.json',json, (err) => {
                if (err) throw err;
                // res.setHeader("Expires", "Sat, 6 May 1995 12:00:00 GMT");
                res.writeHead(302, {location: "/"});
                res.end();
            })

        })
    });
    
  } else if (pathname.includes('/cats-find-new-home') && req.method === 'GET') {
    // const id = pathname.split('/').pop();
    // let newId = Number(id) - 1;
    // //const cat = cats.find((cat) => cat.id === id);
    // const filePath = path.normalize(path.join(__dirname, '../views/catShelter.html'));
    // fs.readFile(filePath, (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         res.writeHead(404, { 'Content-Type': 'text/plain' })
    //         res.write('Error 404 File Not Found');
    //         res.end();
    //     }

    //     const shelterCat = `<form action="/cats-find-new-home/${id}" method="POST" class="cat-form" enctype="multipart/form-data">
    //     <h2>Shelter the cat</h2>
    //     <img src="/content/images/${cats[newId].image}" alt="${cats[newId].name}">
    //     <label for="name">Name</label>
    //     <input type="text" id="name" value="${cats[newId].name}" disabled>
    //     <label for="description">Description</label>
    //     <textarea id="description" disabled>${cats[newId].description}</textarea>
    //     <label for="group">Breed</label>
    //     <select id="group" disabled>
    //         <option value="${cats[newId].breed}">${cats[newId].breed}</option>
    //     </select>
    //     <button type="submit">SHELTER THE CAT</button>
    // </form>`

    //     const modifiedData = data.toString().replace('{{shelterCat}}', shelterCat);
    //     res.write(modifiedData);
    //     res.end();
    // });
    console.log('get cats-find-new-home');
    let filepath = path.normalize(
        path.join(__dirname, "../views/catShelter.html")
    );

    const index = fs.createReadStream(filepath);

    index.on('data', (data) => {
        //console.log('~req', req, '\n~res', res);
        console.log('~req-url:', req.url)
        let newId = req.url.match(/[\A-Za-z0-9]+$/g)[0];    //get id from url
        console.log('new id',newId);

        let currentCat = search(cats, newId);
        console.log(currentCat);


        let modifiedData = data.toString().replace('{{imageLoc}}', './content/images/'+currentCat.image);
        modifiedData = modifiedData.replace(/{{name}}/g, currentCat.name);
        modifiedData = modifiedData.replace('{{description}}', currentCat.description);

        modifiedData = modifiedData.replace(/{{breed}}/g, currentCat.breed);

        res.write(modifiedData);
    });

    index.on('end', () => {
        res.end();
    });

    index.on('error', (err) => {
        console.log(err);
    });
} else if (pathname.includes('/cats-find-new-home') && req.method === 'POST') {
    fs.readFile('./data/cats.json', 'utf8', (err, data) => {
        if (err) {
            console.log("FROGGGS")
        };

        const id = pathname.split('/').pop();
        let allCats = JSON.parse(data).filter(cat => cat.id !== id);
        const json = JSON.stringify(allCats);

        fs.writeFile('./data/cats.json', json, (err) => {
            if (err) {
                throw err;
            };
            console.log(`Cat ID:${id}`);
        })
    });
    res.writeHead(301, { 'location': '/' });
    res.end();
}  else {
    return true;
  }
}
function search(arr, val) {
  for (let i=0; i<arr.length; i++) {    
      if (arr[i].id === val) {
          return arr[i];
      }
  }
}