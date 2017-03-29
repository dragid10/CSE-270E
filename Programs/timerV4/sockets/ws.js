/**
 * Name: Alex Oladele
 * Date: 1/21/17
 * Course CSE 270e
 * Assignment: //TODO
 */

var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('socket.io')(server);
// var socket = new io.Socket();

var server = http.createServer(function (request, response) {
    var path = url.parse(request.url).pathname;

    switch (path) {
        case '/':
            fs.readFile(__dirname + path, function (error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write("opps this doesn't exist - 404");
                    response.end();
                }
                else {
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
server.listen(8001);

//start socket.io listener
var listener = io.listen(server);

//array to keep set of sockets
var sockets = [];

//dynamic count of connected sockets
var cnt = 0;

//event handler for connection
io.sockets.on('connection', function (socket) {
    sockets.push(socket);
    console.log("new connection - " + socket.id);

//and register the disconnect handler on the SOCKET - not on the listener
    socket.on('disconnect', function () {
        //remove from array
        var s = [];
        var cnt = -1;
        for (var i = 0, l = sockets.length; i < l; i++) {
            if (sockets[i].id !== socket.id) {
                s[++cnt] = sockets[i];
            }
        }
        console.log("Removing socket from array - oldCnt = " + sockets.length + " newcnt=" + s.length);
        sockets = s;

    });
});

//send data to client
setInterval(function () {
    cnt++;
    for (var i = 0, l = sockets.length; i < l; i++) {
        if (sockets[i]) {
            sockets[i].emit('date', {'date': new Date(), 'cnt': cnt});
        }
    }
}, 1000);


console.log("listening on 8001");