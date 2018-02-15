
var express = require("express");
var app     = express();
var path    = require("path");
var mysql = require('mysql');


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



var con = mysql.createConnection({

  host: "localhost",
  user: "root",
  password: "123456",
  database: "logindb"

});

app.get('/',function(req,res){

  res.sendFile(path.join(__dirname+'/login1'));

});

app.post('/submit.html',function(req,res){


  var name=req.body.name;
  var email=req.body.email;
  var password=req.body.password;

  res.write('You sent the name "' + req.body.name+'".\n');
  res.write('You sent the email "' + req.body.email+'".\n');
  res.write('You sent the username "' + req.body.password+'".\n');


  con.connect(function(err) {

  if (err) throw err;
  var sql = "INSERT INTO user1 (name, email,password) VALUES ('"+name+"', '"+email+"','"+password+"')";
  con.query(sql, function (err, result) {

    if (err) throw err;

    console.log("1 record inserted");
     res.end();

    });

  });
})

app.listen(3000);

console.log("Running at Port 3000");

