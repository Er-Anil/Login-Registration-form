const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mydb', (err, database) => {
  
  console.log(err);
  // ... start the server
})