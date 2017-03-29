/*
    Name: Alex Oladele
    Date: 1/12/2017
    Course: CSE 270e
*/

var express = require('express'),
config = require('./server/configure'),
app = express();

 /*Defines constants for the application using node.*/

// sets port equal to the default port of the system. Fallback port is 3300
app.set('port', process.env.PORT || 3300);

// Sets views to the views directory 
app.set('views', __dirname + '/views');
app = config(app);

/*// When browser looks at the root of the server, it displays a "Hello World" page
app.get('/', function(req, res) {
    res.send("Hello World");
});*/

// Listens for when the server is up and prints a message to the console
var server = app.listen(app.get("port"), function () {
    console.log("Server up: http://localhost:" + app.get("port"));
});