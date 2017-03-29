/*
 Name: Alex Oladele
 Date: 1/12/2017
 Course: CSE 270e
 */

var express = require('express'),
    config = require('./server/configure'),
    app = express(),
    mongoose = require('mongoose');

/*Defines constants for the application using node.*/

// sets port equal to the default port of the system. Fallback port is 3300
app
    .set('port', process.env.PORT || 3300);

// Sets views to the views directory 
app.set('views', __dirname + '/views');
app = config(app);

// Necessary for some reason
mongoose.Promise = global.Promise;

// Connect to the our local mongo server for the project
mongoose.connect('mongodb://localhost/imgPLoadr');

// When connected, print to log success msg
mongoose.connection.on('open', function () {
    console.log('Mongoose Connected!');
});

// Listens for when the server is up and prints a message to the console
var server = app.listen(app.get("port"), function () {
    console.log("Server up: http://localhost:" + app.get("port"));
});