var mysql = require('mysql');
var readline=require('readline');


var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password: "123456",
    database: "logindb"
});

con.connect(function(error,conn){

    if(err){
        console.log('Error connecting to database');
    }
});

var r1=readline.createInterface({
    input:process.stdin,
    output:process.stdout

});

r1.question('Enter user id', (id)=>{
    var
})

   