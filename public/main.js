var socket = io.connect('http://192.168.43.250:8080',{'forceNew':true});
socket.on('messages', function(datos){
  console.log(datos);
  render(datos);
});
socket.on('tiempo',function(datos){
  html = "estamos aqui xD";
  document.getElementById('messages').innerHTML = html
});




function render(datos){
  //console.log(datos.text);
  //document.getElementById('messages').innerHTML = ${datos.text};
 var html =datos.map(function(elem,index){
    return("<div><strong>"+elem.autor+"</strong><em>"+elem.text+"</en></div>");
  }).join(" ");

  document.getElementById('messages').innerHTML= html;
}

function addMessage(e){
  var playload = {
    autor:document.getElementById('userName').value,
    text:document.getElementById('contra').value,
    //tiempo:document.getElementById('tiempo').value
  };
  //var tiempo = document.getElementById('tiempo').value;
  socket.emit('newMessage',playload);
  return false;
}
