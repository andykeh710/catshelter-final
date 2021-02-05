const url = require('url');
<<<<<<< HEAD
const fs = require('fs');
=======
const fs = require('fs'); // File System


>>>>>>> f2c63cf... Working cat Shelter

function getContentType(url) {
  if(url.endsWith('css')) {
    return 'text/css'
  } else if (url.endsWith('html')) {
    return 'text/html'
<<<<<<< HEAD
=======
  } else if (url.endsWith('jpg')) {
    return 'image/jpg' 
>>>>>>> f2c63cf... Working cat Shelter
  } else if (url.endsWith('png')) {
    return 'text/png'
  } else if (url.endsWith('js')) {
    return 'text/js'
  } else if (url.endsWith('')) {
    return 'application/json'
  }
}


module.exports = (req, res) => {
  const pathname = url.parse(req.url).pathname;

<<<<<<< HEAD
  if (pathname.startsWith('/content') && req.method === "GET") {
    fs.readFile(`./${pathname}`, 'utf-8', (err, data) => {
      if(err) {
        console.log(err);
        res.writeHead(404, {
          "Content-Type": "text/plain"
        });
        res.write('Error was found, use the force next time');
        res.end();
        return
      }
      //console.log('static files.js [31] pathname is ', pathname);
      res.writeHead(
        200,
        {"Content-Type": getContentType(pathname)}
      );
     // console.log('the data is ', data)
      res.write(data);
      res.end();
    })
  }
}
=======
  if(pathname.startsWith('/content') && req.method === "GET"){
      fs.readFile(`./${pathname}`, 'utf-8', (err, data) => {
          if(err){
              console.log(err);
              res.writeHead(404, {
                  "Content-Type": "text/plain"
              });
              res.write("Error was found");
              res.end();
              return;
          }
          console.log('static files.js (32 pathname is ', pathname);
          res.writeHead(
              200,
              {"Content-Type": getContentType(pathname)}
          );
          res.write(data);
          res.end();
      });
  }
}
// module.exports = (req, res) => {
//   const pathname = url.parse(req.url).pathname;

//   if (pathname.startsWith('/content') && req.method === "GET") {
//      if (pathname.endsWith('png') || pathname.endsWith('jpg') || pathname.endsWith('jpeg') || pathname.endsWith('ico') && req.method === "GET") {
//             fs.readFile(`./${pathname}`, (err, data) => {
//               if(err) {
//                 console.log(err);
//                 res.writeHead(404, {
//                   "Content-Type": "text/plain"
//                 });
//                 res.write('Error was found, use the force next time');
//                 res.end();
//                 return
//               }
//               //console.log('static files.js [31] pathname is ', pathname);
//               res.writeHead(
//                 200,
//                 {"Content-Type": getContentType(pathname)}
//               );
//             // console.log('the data is ', data)
//               res.write(data);
//               res.end();
//             });

//     } else {
//             fs.readFile(`./${pathname}`, 'utf8', (err, data) => {
//               if(err) {
//                 console.log(err);
//                 res.writeHead(404, {
//                   "Content-Type": "text/plain"
//                 });
//                 res.write('Error was found, use the force next time');
//                 res.end();
//                 return
//               } 
//               //console.log('static files.js [31] pathname is ', pathname);
//               res.writeHead(
//                 200,
//                 {"Content-Type": getContentType(pathname)}
//               );
//             // console.log('the data is ', data)
//               res.write(data);
//               res.end();
//             });
//     }
//   } else {
//       return true;      
//   }
// }


>>>>>>> f2c63cf... Working cat Shelter
