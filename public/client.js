

var socket = io.connect('http://localhost:4200');
socket.on('connect', function(data) {
   socket.emit('join', 'Hello World from client');
});

socket.on('broad', function(data) {

         console.log(data)
         let datastr=data
         $('#created_at').html(data.created_at)
         $('#entry_id').html(data.entry_id)
         $('#field1').html(data.field1)
         $('#field2').html(data.field2)
         $('#field3').html(data.field3)
         $('#field4').html(data.field4)
         $('#field5').html(data.field5)
         console.log(datastr.created_at)
         console.log(datastr.entry_id)

        $('#future').html(data);
  });

$('form').submit(function(e){
    e.preventDefault();
    var message = $('#chat_input').val();
    socket.emit('messages', message);
});
