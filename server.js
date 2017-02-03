var path = require('path');
var express = require('express');
var app = express(); // the app returned by express() is a JavaScript Function. Not something we can pass to our sockets!
var socketio = require('socket.io');
let Session = require('./models/table');
// app.listen() returns an http.Server object
// http://expressjs.com/en/4x/api.html#app.listen

Session.sync({force: true})
.then(function() {
  var server = app.listen(1337, function () {
    console.log('The server is listening on port 1337!');
  });

  var io = socketio(server);

  io.on('connection', function (socket) {
    /* This function receives the newly connected socket.
       This function will be called for EACH browser that connects to our server. */
    console.log('A new client has connected!');
    console.log(socket.id);
    socket.on('draw', function(start, end, strokeColor) {
      console.log(start, end, strokeColor);
      Session.create({
        startX: +start.x,
        startY: +start.y,
        endX: +end.x,
        endY: +end.y,
        color: strokeColor
      }).then(function(session) {
        console.log('session create', session);
      }).then(function() {
        socket.broadcast.emit('drawn', start, end, strokeColor);
      });
    });
    socket.on('disconnect', function() {
      console.log("A client has left :'(");
    });
  });
}).catch(console.error.bind(console));

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// app.get('/saved', function (req, res) {
//   Session.findAll({})
//   .then(function(results) {
//     results.forEach(function(result) {
//     let start = {
//       x: result.startX,
//       y: result.startY
//     },
//     end = {
//       x: result.endX,
//       y: result.endY
//     },
//     strokeColor = result.color;
//     res.sendFile(path.join(__dirname, 'index.html'));
//     whiteboard.draw(start, end, strokeColor, false);
//     });
//   });
// });

