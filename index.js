// app.js
const PORT = 4200
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var connection = false
const request = require('request-promise')
const options = {
  method: 'GET',
  url: 'https://api.thingspeak.com/channels/176785/feed/last.json'
}

setInterval(function(){
  request(options)
  .then(function (response){
    console.log(response)
    var obj2 = JSON.parse(response, function(key, value) {
      if (typeof value === "string" &&
      value.substring(0, 5) === "/Foo(" &&
      value.substr(-2) == ")/"
    ) {
      return new Foo(value.substring(5, value.length - 2));
    }
    return value;
  });
   console.log(obj2)
  latestresponse=obj2
  if (connection) {
    console.log("sending results");
    io.emit('broad', latestresponse);
  }
})
.catch(function (err) {
  console.log(err)
})

}, 15 * 1000);

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res,next) {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(client) {
  connection=true;
  console.log('Client connected...');

  client.on('join', function(data) {
    console.log(data);
  });

  client.on('messages', function(data) {
    client.emit('broad', data);
    console.log("sending results");
    client.broadcast.emit('broad',data);
  });

});

console.log("Listening on port ",PORT)
server.listen(process.env.PORT || PORT);
