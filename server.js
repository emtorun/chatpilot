var fs = require("fs");
var host = "localhost";
var port = 3003;
var express = require("express");
var names = {};

var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(3003);

app.use(app.router); //use both root and other routes below
app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folderd

io.sockets.on('connection', function (socket) {
	socket.on('new_url', function (data) {
		console.log('new url received');
		socket.broadcast.emit('new_url', data);
	});
	socket.on('message', function (data) {
		console.log('new message received');
		io.sockets.emit('message', data);
	});
	socket.on('create', function (data) {
		if (!names[data]) {
			names[data] = socket.id;
			socket.join(data);
			socket.emit('created', data);
		}
	})
});

