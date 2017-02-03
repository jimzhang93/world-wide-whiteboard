// Never seen window.location before?
// This object describes the URL of the page we're on!

var socket = io(window.location.origin);

socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!');
});

socket.on('drawn', function(start, end, strokeColor) {
  $.ajax({
    method: 'GET',
    url: '/'
  }).then(function(results) {
    results.forEach(function(result) {
    let start = {
      x: result.startX,
      y: result.startY
    },
    end = {
      x: result.endX,
      y: result.endY
    },
    strokeColor = result.color;
    res.sendFile(path.join(__dirname, 'index.html'));
    whiteboard.draw(start, end, strokeColor, false);
    });
  });
});

whiteboard.on('draw', function(start, end, strokeColor) {
  console.log(strokeColor);
  socket.emit('draw', start, end, strokeColor);
});
