const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const axios = require('axios');
// Get our API routes
const api = require('./routes/api');
const { json } = require('body-parser');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist/')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});
// app.get("/api/getdata",(req,res)=>{console.log("http://localhost:3000/api/getdata")})
app.get(['/getdata','api/getdata',"/api/getdata",'http://localhost:4200/api/getdata','http://localhost:3000/api/getdata'],async (req,res)=>{
  const pl = req.query.place;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+pl+"&units=metric&appid=ce3dc7325abe309dd92f8685aafd176f";
  
   https.get(url,function(response){
  // console.log(response.statusCode);
  if(response.statusCode!=200)
  {
   console.log("error");
     res.send(null);
    }
    else
    {
      console.log(response)
    response.on("data",function(data){
         res.send(JSON.parse(data))
      })
        
    }
    })

    // (async () => {
    //   try {
    //     const response = await axios.get(url)
    //     weathers = response['data'];
    //     // console.log(weathers)
    //     return "working";
    //     // response.on("data",function(data){
    //     //          weathers=JSON.parse(data);
    //     //         // console.log(weathers)
    //     //         return weathers;
    //     //       })
    //   } catch (error) {
    //     console.log(error);
    //     return null;
    //   }
    // })();

})

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
