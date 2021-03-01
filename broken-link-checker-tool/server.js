const express = require('express');
const cors = require("cors");
const server = express();
var { SiteChecker } = require("broken-link-checker");
const products = require('./products.js');
server.use(express.json());
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
    next();
  });
  server.get("/", (req, res) => {
     products().then(sponse => {
         let dis = sponse.filter(el =>{
             if(el.availability_description.toLowerCase() == 'discontinued')
             return el
         })
         Promise.all(dis).then(() => {
            res.write(`data: ${JSON.stringify(dis)}\n\n`)})
          });


        //  dis.then(res =>{
        //     res.write(`data: ${JSON.stringify(res)}\n\n`)})
   
       
      
    res.set({
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
  
      // enabling CORS
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    })
  
    // setInterval(() => {
    //   res.write(`data: ${JSON.stringify("hello")}\n\n`)
    // }, 1000)


    const siteChecker = new SiteChecker(
        { 
            excludeInternalLinks: false,
            excludeExternalLinks: false, 
            filterLevel: 0,
            acceptedSchemes: ["http", "https"],
            excludedKeywords: [], 
            cacheResponses:true
        },
        {
            "error": (error) => {
                console.error(error);
            },
            "html":(tree, robots, response, pageURL, customData)=>{
                // console.log(pageURL)
            },
            "link": (result, customData) => {
    
                if(result.broken) {
                    console.log(result)
                    if(result.http.response && ![undefined, 200].includes(result.http.response.statusCode)) {
                        res.write(`data: ${JSON.stringify(result.http.response.statusCode + " " + result.base.original+ " "+result.url.original)}\n\n`)
                        // console.log(`${result.http.response.statusCode} => ${result.url.original}`);
                    }
                }
            },
            "end": () => {
                console.log("COMPLETED!");
            }
        }
    );
    
    siteChecker.enqueue("https://www.servocity.com/");
  })

//   fs.readFile('debug-log.json', function (err, data) {
//     var json = JSON.parse(data);
//     let status = {"Store":id,"Status":"Sucess","Date":new Date().toLocaleString()}
//     json.push(status);    
//     fs.writeFile("debug-log.json", JSON.stringify(json), function(err){
//       if (err) throw err;
//     });
// })


module.exports = server;
