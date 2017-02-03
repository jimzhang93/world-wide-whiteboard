// Never seen window.location before?
// This object describes the URL of the page we're on!
var socket = io(window.location.origin);

socket.on('connect', function () {
  console.log('I have made a persistent two-way connection to the server!');
  $.ajax({
    method: 'GET',
    url: '/saved'
  }).then(function(results) {
    results.forEach(function(result) {
      console.log(result);
      let start = {
        x: result.startX,
        y: result.startY
      },
      end = {
        x: result.endX,
        y: result.endY
      },
      strokeColor = result.color;
      whiteboard.draw(start, end, strokeColor, false);
    });
  });
});

socket.on('drawn', function(start, end, strokeColor) {
  whiteboard.draw(start, end, strokeColor, false);
});

whiteboard.on('draw', function(start, end, strokeColor) {
  console.log(strokeColor);
  socket.emit('draw', start, end, strokeColor);
});
