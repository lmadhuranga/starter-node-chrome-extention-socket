var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const port = 1234;
const server = app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
    socket.emit('init_logs', [{
        title:"title 1",
        body:'body 2'
    }])
}); 
