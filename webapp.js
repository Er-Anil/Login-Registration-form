var express = require('express');
var session = require('express-session');
var bodyParser = require("body-parser");
var app = express();
const bcrypt = require('bcrypt');
var mysql = require('mysql');

app.use(express.static(__dirname + '/public'));



app.set('view engine', 'ejs');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'logindb'
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '../public'));

// index page
app.get('/', function (req, res) {
    res.render('page/homepage');
});

app.get('/loginpage', function (req, res) {
    res.render('page/loginpage');
});
app.get('/registerpage', function (req, res) {
    res.render('page/registerpage');
});

app.get('/aboutpage', function (req, res) {
    res.render('page/aboutpage');
});

app.get('/contactpage', function (req, res) {
    res.render('page/contactpage');

});
app.get('/logoutpage', function (req, res) {
    res.render('page/logoutpage');

});



app.post("/submit", function (req, res) {
    if (req.body.name == "") {
        res.send("Please add name ");


    } else {

        var hash = bcrypt.hashSync(req.body.password, 10);

    

        connection.query('INSERT INTO user1 (email, name, password) VALUES (?, ?, ?)', [req.body.email, req.body.name, hash], function (err, result) {
            if (err) throw err

            res.render('page/Registeredresponse');

        })
    }
})



/////  Login User   ///////
app.post('/submitlogin', function (req, res) {

    connection.query("select * from user1 where name='" + req.body.username + "'", function (err, result) {

        if (result.length == 0) {

            res.send("This id is not Register Please enter valid user ID");
        }

        else {
            var passcompare = bcrypt.compareSync(req.body.password, result[0].password);

            if (passcompare) {


                res.render('page/loginresponse');
            }

            else {
                console.log(result);
                res.render('page/passnotmatch');
            }
        }

    })


});


app.listen(8082);
console.log('app started at port 8082');
