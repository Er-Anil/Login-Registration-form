///////////////////////////////////////////////////////////////////////////

var express = require('express');
var app = express();
var mysql = require('mysql');
var session = require('express-session');
const bcrypt =require('bcrypt');

var bodyParser=require("body-parser");

app.set('view engine','ejs'); 

// database connectivity
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'logindb'
  })
  
    app.use(session({secret:'secretkey',
    resave:true,
    saveUninitialized:true
    }));

 

////////////////////////////////////////////////////////////////////////////////////////////////


 app.use(bodyParser.urlencoded({ extended: true })); // using body parser to get the data. kanha se data uthana hai 

 connection.connect(function(err) {});
 app.use( express.static( __dirname,"/images" ) );

    app.get('/', function(req,res){
        res.render('home');
    });

    app.get('/register', function(req,res){
        res.render('register');
    });


    app.get('/login', function(req,res){
        res.render('login');   
    });

    app.get('/logout', function(req,res){
        res.render('logout');
    });

    app.get('/passwordnotmatched', function(req,res){
        res.render('passwordnotmatch');
    });


/////////////////////////////////////////////////////////////////////////////////////////////
   ////  Register user ////
    app.post("/submit",function(req,res)
    {
    if(req.body.name==""){
    res.send("Please add name ");
   

   }else{
   
    var hash = bcrypt.hashSync(req.body.password, 10);

       
       
       connection.query('INSERT INTO user1 (email, name, password) VALUES (?, ?, ?)', [req.body.email,req.body.name ,hash ], function(err, result) {
               if (err) throw err
               
               // console.log(result);
                 res.render("response");
                
               })
          }
   })

    /////  Login User   ///////
    app.post('/submitlogin', function(req,res,next){
         
           connection.query("select * from user1 where name='"+req.body.username+"'", function(err, result) {

            if(result.length==0){

                res.send("This id is not Register Please enter valid user ID"); 
            } 

            else 
            {  
                if(bcrypt.compareSync(req.body.password, result[0].password))
                   {   
                    res.render("loginresponse");   
                
                    }
                else
                {
                res.render("passwordnotmatch");
                }
            }
          })        
      
    
   });

app.listen(8000);
console.log('app started at 8000 port');