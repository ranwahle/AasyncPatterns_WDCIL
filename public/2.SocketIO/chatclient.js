/**
 * Created by ranwahle on 18/06/2016.
 */
(function(){
    var socket = io('http://localhost:3010');

    document.addEventListener('DOMContentLoaded', function(){
       document.getElementById('btnSend').addEventListener('click',
       function(){
            socket.emit('chat message', document.getElementById('txtMessage').value);
       });
    });

    var socketIoPublisher = new window.publisher();

    socketIoPublisher.addEventListener('messageReceived', function(message){
        document.getElementById('chatContent').innerHTML += '<br/>'
        + message;
    });

    socket.on('chat message', function(message){
        socketIoPublisher.fireEvent('messageReceived', message);
    });

}());
