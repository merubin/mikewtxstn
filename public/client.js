

var socket = io.connect('http://localhost:4200');
socket.on('connect', function(data) {
   socket.emit('join', 'ClientFE Now Connected');
   drawBarChart(0)
});



function drawBarChart(value) {
    console.log("drawBarChart");
    var scale = d3.scale.linear()
        .domain([0, 50])
        .range([0, 100]);

    var bars = d3.select("#bar-chart")
        .selectAll("div")
        .attr("id","bar-chart")
        .data([value]);

    // enter selection
    bars
        .enter().append("div");

    // update selection
    bars
        .style("height", function (d) {return scale(d) + "%";})
        .text(function (d) {return d;});

    // exit selection
    bars
        .exit().remove();
};

function updateBarChart(value) {
    console.log("Update here");
    var data = [value];
    drawBarChart(data);
};
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

         updateBarChart(data.field1)
        $('#future').html(data);
  });

$('form').submit(function(e){
    e.preventDefault();
    var message = $('#chat_input').val();
    socket.emit('messages', message);
});
