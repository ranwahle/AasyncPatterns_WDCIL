/**
 * Created by ranwahle on 18/06/2016.
 */
var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var messages = [];
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket){
    console.log('a user connected');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        messages.push({date:  new Date(),message:  msg});
        io.emit('chat message', msg);
    });
});

app.get('/allMessages',function(request, response) {
    response.end(JSON.stringify(messages));
});



app.get('/users', function (request, response)
{
    response.end(JSON.stringify([{name: 'Ran', lastName: 'Wahle', id: 2}]))
});

app.get('/users/:id/children', function(request, response){
   response.end(JSON.stringify([{name: 'Shiri', lastName: 'Wahle'}
   , {name: 'Yaron' , lastName: 'Wahle',}
   , {name: 'Shani', lastName: 'Wahle'}]));
});


http.listen(3010, function(){
    console.log('listening on *:3010');
});
