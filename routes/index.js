var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');

	});

router.get('/registr', function(req, res, next) {
    res.render('registr');

});
router.get('/login', function(req, res, next) {
    res.render('login',{title:''});

});
router.post('/login',function (req,res) {
	MongoClient.connect(url, function(err, db) {
  if (err) throw err;
 	var dbo = db.db("my-db");
  	var userData = {

    name:req.body.name,
    username:req.body.username,
    username1:req.body.username1,
  	surname:req.body.surname,
        age:req.body.age,
 	mail:req.body.mail,
    password:req.body.password,
 	 password1:req.body.password1

 	};

 dbo.collection("customers").insert(userData, function(err, res1) {
    if (err) throw err;
 //   console.log("1 document inserted");
res.render('login',{title:''});
    db.close();
  });


})
});

 router.post('/userpage',function (req,res) {
   MongoClient.connect(url, function(err, db) {
        if (err) throw err;
	var dbo = db.db("my-db");

     dbo.collection("customers").findOne(function(err, result) {

           if (err) throw err;
         console.log(result);

if(result.name==req.body.username) {
    console.log(result.name);
    if (result.password == req.body.password1) {
        console.log(result.password);
             res.render('userpage', {
                 username:result.name,
                 surname:result.surname,
                 age:result.age,
                  mail:result.mail,
                 password:result.password});
    }else{
        //password false
        res.render('login', {title: 'error password '});
    }
   }
     else{//username false

          res.render('login',{title:'err error username '});

         }
  db.close();
       });
   });
 });


 module.exports = router;
