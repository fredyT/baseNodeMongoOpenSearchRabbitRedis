const express = require("express");
const containerTypeService = require("../services/containerTypeServiceTest");
// const access = require("../middleware/access");
// const decodeToken = require("../utils/tokens");
// const passport = require("passport");
const router = express.Router();

router.post("/search", async (req, res) => {

  let accountID = "1234"

  console.log('json object passed in is add item catalog ' + JSON.stringify(req.body));

  containerTypeService.searchContainerType(accountID, req.body)
  .then((item)=>{
      console.log('successful return from search containerType');
      res.status(200).json(item);
  }
  ).catch((err) => {
      console.log('error[item catalog api] search container type error: ' + err);
      let errmsg = JSON.stringify('error' + err);
      res.status(400).json(errmsg);
  })
   
});

router.get("/",  async (req, res) => {
  //assumption is authirization header is there as this route requires authenticaed users
  let accountID = "1234";

  
  containerTypeService.listContainterTypes(accountID)
    .then((item) => {
      console.log("successful return from getAccountByID ");
      res.status(200).json(item);
    })
    .catch((err) => {
      let errmsg = JSON.stringify("error" + err);
      res.status(400).json(errmsg).end();
    });
});

router.post("/", async (req, res) => {

    let accountID = "1234";


    console.log('json object passed in is add container type ' + JSON.stringify(req.body));

    containerTypeService.addContainerType(accountID, req.body)
    .then((item)=>{
        console.log('successful return from addNewContainerType');
        res.status(200).json(item);
    }
    ).catch((err) => {
        console.log('error[containertype api] adding container type error: ' + err);
        let errmsg = JSON.stringify('error' + err);
        res.status(400).json(errmsg);
    })
     
});

router.post("/queue", async (req, res) => {

  let accountID = "1234";


  console.log('json object passed in is add container type  queue' + JSON.stringify(req.body));

  containerTypeService.addContainerTypeQueue(accountID, req.body)
  .then((item)=>{
      console.log('successful return from addNewContainerTypeQueue');
      res.status(200).json(item);
  }
  ).catch((err) => {
      console.log('error[containertypeQueue] adding container type error: ' + err);
      let errmsg = JSON.stringify('error' + err);
      res.status(400).json(errmsg);
  })
   
});

module.exports = router;
