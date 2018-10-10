const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db			 = require('./config/db')

const app            = express();

//start server
const port = 8000;

//body parser
app.use(bodyParser.urlencoded({ extended: true }));

//mongoDB - no Mongoose (updagrade?)
MongoClient.connect(db.url, { useNewUrlParser: true }, (err, database) => {
  	if (err) return console.log('Error ==>',err)

  	//routes
  	dbase = database.db("notesdb")
  	require('./app/routes')(app, dbase)

  	//server up
    
    
  	app.listen(port, () => {
	  console.log('We are live on ' + port, 'lets rock!');
	});           
})


