
/*******************************************************************************
*   Mike Rubin Project 4   WX Station Dashboard
*******************************************************************************/


/* Program Constants */
const VERSION = "1-DEC-2016:11am"
const PORT = 4200               /* Local Port for testing */
const TXTMSG_NOTIFY=false       /* flag for text message notification */
const MAX_TIME_OUTS=2           /* Wait 1 minute of no response before going offline */

/* Global Variables */
var firstTimeOffline=false
var rubin_channel_id=parseInt(process.env.THINGSPEAK_RUBIN_CHANNEL_ID)
var text_magic_api_key=process.env.TEXTMAGIC_API_KEY
var rubin_notify_phone=process.env.RUBIN_NOTIFY_PHONE


var listeningPort = process.env.PORT || PORT       /* port address for Heroku */
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var TMClient = require('textmagic-rest-client');
var WxConnectStatus =  require('./wxconnection')
var connection = false

var wxCstat= new WxConnectStatus()

/* Thinkspeak configuration information */

const request = require('request-promise')
const options = {
  method: 'GET',
  url: 'https://api.thingspeak.com/channels/'+rubin_channel_id+ '/feed/last.json'
}

setInterval(function(){
  request(options)
  .then(function (response){
    var obj2 = JSON.parse(response, function(key, value) {
      if (typeof value === "string" &&
      value.substring(0, 5) === "/Foo(" &&
      value.substr(-2) == ")/"
    ) {
      return new Foo(value.substring(5, value.length - 2));
    }
    return value;
  });

  latestresponse=obj2
  if (connection) {

    if (wxCstat.wxLastReading(latestresponse)  > MAX_TIME_OUTS) {
      console.log("OFFLINE Now");  /* Alert User we are offline */
      io.emit('offline', {Mode: 'Offline'}) ;
      if (!firstTimeOffline) {
        let c = new TMClient('mikerubin', text_magic_api_key);
        firstTimeOffline=true
        /* TextMagic Msg Integration */
        if (TXTMSG_NOTIFY) {  /* only in testing will we start off by sending text message that unit has restarted */
        c.Messages.send({text: 'Rubin-WTX Weather Stn Offline at:'+latestresponse.created_at, phones: rubin_notify_phone }, function(err, res){
            console.log('Messages.send()', err, res);
        });
      } /* TXTMSG_NOTIFY */
      } /* !firstTimeOffline */
    } /* MAX_TIME_OUTS */
    else {
    firstTimeOffline=false;
    io.emit('broad', latestresponse);
  }
  }
})
.catch(function (err) {
  console.log(err)
})

}, 15 * 1000);  /* Poll ThinkSpeak every 30 seconds for new information */

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res,next) {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(client) {
  connection=true;
  client.on('join', function(data) {
    console.log(data);
  });

  client.on('messages', function(data) {
    client.emit('broad', data);
    wxCstat.wxLastReading(data)
    client.broadcast.emit('broad',data);
  });

});
/* TextMagic Msg Integration */
if (TXTMSG_NOTIFY) {  /* only in testing will we start off by sending text message that unit has restarted */

let c = new TMClient('mikerubin', text_magic_api_key);
c.Messages.send({text: 'Starting Rubin-WTX Weather Stn', phones: rubin_notify_phone }, function(err, res){
    console.log('Messages.send()', err, res);
});
}/* TXTMSG */
console.log("Server Version Running ",VERSION)
console.log("Listening on port ",listeningPort)
server.listen(listeningPort);
