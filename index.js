


// app.js
const PORT = 4200
const TXTMSG_NOTIFY=false       /* flag for text message notification */
var rubin_channel_id=parseInt(process.env.THINGSPEAK_RUBIN_CHANNEL_ID)
var text_magic_api_key=process.env.TEXTMAGIC_API_KEY
var rubin_notify_phone=process.env.RUBIN_NOTIFY_PHONE


console.log("rubin_channel =" ,rubin_channel_id)
console.log("text_magic_api_key=",text_magic_api_key)
console.log("rubin_notify_phone=",rubin_notify_phone)

var listeningPort = process.env.PORT || PORT       /* port address for Heroku */
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var TMClient = require('textmagic-rest-client');
var WxConnectStatus =  require('./wxconnection')
var connection = false

var wxCstat= new WxConnectStatus()

console.log(" Connection status at start",wxCstat.wxConnected())
console.log(" setting connected",wxCstat.wxConnect())
console.log(" Connection after connected",wxCstat.wxConnected())
console.log(" setting disconnected",wxCstat.wxDisconnect())
console.log(" Connection after dis connect",wxCstat.wxConnected())
/* Thinkspeak configuration information */
var lastTimestamp=""

const request = require('request-promise')
const options = {
  method: 'GET',
  url: 'https://api.thingspeak.com/channels/'+rubin_channel_id+ '/feed/last.json'
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
    wxCstat.wxLastReading(data)
    console.log("sending results");
    client.broadcast.emit('broad',data);
  });

});
/* TextMagic Msg Integration */
if (TXTMSG_NOTIFY) {

console.log("now Logging into Txt Msg")
var c = new TMClient('mikerubin', text_magic_api_key);
c.Messages.send({text: 'Starting Rubin-WTX Weather Stn', phones: rubin_notify_phone }, function(err, res){
    console.log('Messages.send()', err, res);
});
}/* TXTMSG */

console.log("Listening on port ",listeningPort)
server.listen(listeningPort);
