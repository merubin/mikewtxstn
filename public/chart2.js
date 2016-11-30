
var rubin_channel_id=parseInt(process.evn.THINGSPEAK_RUBIN_CHANNEL_ID)
var thingspeak_api_key=process.env.THINGSPEAK_API_READ_KEY
var rubin_notify_phone=process.env.RUBIN_NOTIFY_PHONE
// variables for the first series
var series_1_channel_id = rubin_channel_id;
var series_1_field_number = 1;
var series_1_read_api_key = thingspeak_api_key;
var series_1_results = 10;
var series_1_color = '#d62020';

// variables for the second series
var series_2_channel_id = rubin_channel_id;
var series_2_field_number = 2;
var series_2_read_api_key = thingspeak_api_key;
var series_2_results = 10;
var series_2_color = '#00aaff';

// chart title
var chart_title = 'Humidity & Temperature 12504 Chasbarb Terrace Herndon VA';
// y axis title
var y_axis_title = 'Temp Deg °C   %Humidity';

// user's timezone offset
var my_offset = new Date().getTimezoneOffset();
console.log("Time Offset=", my_offset)
// chart variable
var my_chart;

function createChart() {
  addChart();
  // add the first series
  addSeries(series_1_channel_id, series_1_field_number, series_1_read_api_key, series_1_results, series_1_color);
  // add the second series
  addSeries(series_2_channel_id, series_2_field_number, series_2_read_api_key, series_2_results, series_2_color);
}

// when the document is ready
$(document).on('ready', redrawChart);


// add the base chart
function addChart() {
  // variable for the local date in milliseconds
  var localDate;

  // specify the chart options
  var chartOptions = {
    chart: {
      renderTo: 'chart-container',
      defaultSeriesType: 'line',
      backgroundColor: '#ffffff',
      events: { }
    },
    title: { text: chart_title },
    plotOptions: {
      series: {
        marker: { radius: 3 },
        animation: true,
        step: false,
        borderWidth: 0,
        turboThreshold: 0
      }
    },
    tooltip: {
      // reformat the tooltips so that local times are displayed
      formatter: function() {
        var d = new Date(this.x + (my_offset*60000));
        var n = (this.point.name === undefined) ? '' : '<br>' + this.point.name;
        return this.series.name + ':<b>' + this.y + '</b>' + n + '<br>' + d.toDateString() + '<br>' + d.toTimeString().replace(/\(.*\)/, "");
      }
    },
    xAxis: {
      type: 'datetime',
      title: { text: 'Time' }
    },
    yAxis: { title: { text: y_axis_title } },
    exporting: { enabled: false },
    legend: { enabled: false },
    credits: {
      text: 'GA Project 4 Mike Rubin',
      href: 'https://thingspeak.com/',
      style: { color: '#D62020' }
    }
  };

  // draw the chart
  my_chart = new Highcharts.Chart(chartOptions);
}

// add a series to the chart
function addSeries(channel_id, field_number, api_key, results, color) {
  var field_name = 'field' + field_number;

  // get the data with a webservice call
  $.getJSON('https://api.thingspeak.com/channels/' + channel_id + '/fields/' + field_number + '.json?offset=0&round=2&results=' + results + '&api_key=' + api_key, function(data) {

    // blank array for holding chart data
    var chart_data = [];

    // iterate through each feed
    $.each(data.feeds, function() {
      var point = new Highcharts.Point();
      // set the proper values
      var value = this[field_name];
      point.x = getChartDate(this.created_at);
      point.y = parseFloat(value);
      // add location if possible
      if (this.location) { point.name = this.location; }
      // if a numerical value exists add it
      if (!isNaN(parseInt(value))) { chart_data.push(point); }
    });

    // add the chart data
    my_chart.addSeries({ data: chart_data, name: data.channel[field_name], color: color });
  });
}

// converts date format from JSON
function getChartDate(d) {
  // offset in minutes is converted to milliseconds and subtracted so that chart's x-axis is correct
  return Date.parse(d) - (my_offset * 60000);
}

var myVar = setInterval(redrawChart, 1000*30);

function redrawChart() {
createChart();
}