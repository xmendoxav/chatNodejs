var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var messages = [{id:1,
text:"Bienvenido al chat   ",
autor:"Administracion de redes"}];
var ips = [];
var ids = [];
var tiempo = "";

app.use(express.static('public'))
app.get('/', function(req,response){
  response.status(200).send("Hello dog");
});


io.on('connection', function(socket){
  //console.log(socket.id);
  ips.push(socket.request.connection.remoteAddress);
  ids.push(socket.id);
  //console.log("Alguien se ha conectado con socket",ips);
  socket.emit('messages',messages);


  socket.on('newMessage',function (datos){
    messages.push(datos);
    //console.log(datos);
    io.sockets.emit('messages',messages);
    //io.to(ids[0]).emit('messages',messages);
    //io.to(ids[3]).emit('tiempo',messages);
    //messages.pop();


  });
});





server.listen(8080,function(){
  console.log("Servidor corriendo en http://localhost:8080");
});
