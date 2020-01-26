var express = require("express");
var path = require("path");
var db = require('../models');
var SHA256 = require('crypto-js/sha256');
var crypto = require('crypto-js')
var router = express.Router();


//to insert a new user into the db
router.post("/api/signup", function(req, res) {
  req.body.password = JSON.stringify(SHA256(req.body.password).words);
  console.log(req.body)
  db.User.create(req.body).then(data=>res.send(data))

});

router.get("/api/signin", function(req, res){
  console.log("GET request to /api/signin is called");
})

router.post("/api/signin", function(req, res) {
  console.log("Checking DB for user....");
  console.log("Username: " + req.body.username);
  // console.log(req.params.username);
  db.User.findOne({
    where: {username:req.body.username
      
    }
  }).then(data=>{
    console.log("Data.dataValues: " + JSON.stringify(data.dataValues));
    console.log("Encrypted password: " + JSON.stringify(SHA256(req.body.password).words));
    console.log("Data.dataValues.password: " + (data.dataValues.password));
    if(JSON.stringify(SHA256(req.body.password).words) === data.dataValues.password){
      res.json(data)
    }else{
      res.send(null)
    }
  });
});

//Loggin alcohol count
router.post("/api/alcoholuser/", function(req, res) {
  console.log("Adding alcohol counter....");
  console.log(req);
  // console.log(req.params.username);
  db.Alcoholuser.create(req.body).then(data=>res.send(data))
});

//Querying Alcohol table
router.post("/api/alcohol/", function(req,res){
  console.log("checking for alcohol id.....")
  db.Alcohol.findOne({
    where:{
      alcoholType: req.body.alcohol
    }
  }).then(data=>res.send(data)
  );
})
router.put("/api/log/:id", function(req, res) {

});




module.exports = router;