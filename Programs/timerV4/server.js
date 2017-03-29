/*
 Name: Alex Oladele
 Date: 1/12/2017
 Course: CSE 270e
 */

/*
 * Modules
 */
var express = require('express'),
    config = require('./server/configure'), // configure.js
    app = express(), // assigns global var app to the express function
    mongoose = require('mongoose'); // require mongoose
var MongoClient = require('mongodb').MongoClient,
    mongoURL = 'mongodb://localhost/timerv4';
var http = require('http');
var url = require('url');
var fs = require('fs');
var io = require('socket.io')(server2);


/*Defines constants for the application using node.*/

// Constant that sets port equal to the default port of the system. Fallback port is 3300
// Port = 3610
app.set('port', process.env.PORT || 3640);

// Constant that Sets views to the views directory
// views = views folder
app.set('views', __dirname + '/views');

// Passes app through the config (configure.js) module
app = config(app);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/socket.html');
});

// Necessary for some reason
mongoose.Promise = global.Promise;
// mongoose.Promise = require('bluebird');
// Print to console on successful mongo connection
mongoose.connect(mongoURL);
mongoose.connection.on('open', function () {
    console.log('Mongoose connected at: ' + mongoURL);
});

// Listens for when the server is up and prints a message to the console
var server = app.listen(app.get("port"), function () {
    console.log("Server up: http://127.0.0.1:" + app.get("port"));
});

var server2 = http.createServer(function(request, response){
    var path = url.parse(request.url).pathname;
    switch(path){
        case '/':
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('Socket IO Example - visit /socket.html');
            response.end();
            break;
        case '/socket.html':
            fs.readFile(__dirname + path, function(error, data){
                if (error){
                    response.writeHead(404);
                    response.write("opps this doesn't exist - 404");
                    response.end();
                }
                else{
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;
        default:
            response.writeHead(404);
            response.write("opps this doesn't exist - 404");
            response.end();
            break;
    }
});
//start http listener
server2.listen(8002);