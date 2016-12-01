

var socket = io.connect('/');
socket.on('connect', function(data) {
   socket.emit('join', 'ClientFE Now Connected');
   drawBarChart(0)
});



function drawBarChart(value) {
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
    var data = [value];
    drawBarChart(data);
};
socket.on('offline', function (data){
  console.log("Received Offline Message")
  $('#Mode').html(`Mode:${data.Mode}` )
});
socket.on('broad', function(data) {

         let datastr=data
         $('#Mode').html("")
         $('#created_at').html(`Time Stamp:${data.created_at}`)
         $('#entry_id').html(`Entry:${data.entry_id}` )
         $('#field1').html(`Temp °C:${data.field1}` )
         $('#field2').html(`% Humidity:${data.field2}` )
         $('#field3').html(`Stn Press:${data.field3}` )
         $('#field4').html(`Sea Lvl Press:${data.field4}` )
         $('#field5').html(`Voltage:${data.field5}` )
         updateBarChart(data.field1)
        $('#future').html(data);
  });
