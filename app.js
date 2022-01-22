//entry point for the restapi

const express = require('express')
const sessions = require("express-session");
const app = express();

const helmet = require('helmet');
const bodyParse = require("body-parser");
//const expressConfig = require('./config/expressConfig');

const appConfig = require('./config/appConfig');
const {mongoose} = require('./dataService/databaseService');
const openSearchConfig = require('./config/opensearch');

const expressSetup = { PORT : appConfig.NODE_PORT,
                       HOST : appConfig.NODE_HOST }
console.log("env PORT setting is " + process.env.NODE_ENV);
console.log("PORT and HOST " + expressSetup.PORT + " " + expressSetup.HOST);
//helmet helps with securng the api. xxs etc.
app.use(helmet());

app.use(bodyParse.urlencoded( {extended:true}));
app.use(bodyParse.json());

//should throw an error if for example JSON is invalid 
app.use((err, req, res, next) => {
    if (err) {
     // let errmsg = JSON.parse("{ 'error' : 'error in request' ");
      console.log('Invalid Request data' + err);
      res.status(400).json()
    } else {
      next()
    }
  });
  
//setup api/routes.
require('./api')(app);

console.log("in app.js");
console.log("process.env.NODE_ENV is " + process.env.NODE_ENV);

app.get('/',  (req, res) => {
  //send back env info.
    console.log("in get /");
     res.send("hello world");
    //res.status(200).json(expressSetup)
  })
  
  
  //const HOST = process.env.NODE_HOST || 'localhost';
  app.listen(expressSetup.PORT, expressSetup.HOST, () => {
    console.log(`APP LISTENING ON http://${expressSetup.HOST}:${expressSetup.PORT}`);
  })