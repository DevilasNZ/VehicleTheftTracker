var H = Highcharts
    ,map = H.maps['countries/nz/nz-all']
    ,chart;

function generateMapChart(json_directory, map_container){
  // Grab the location data and generate the map.
  Highcharts.getJSON(json_directory, function (json) {
      var data = [];
      json.forEach(function (p) {
          //set latitude and longitude of the data based on the location attribute.
          switch(p.location){
            case "Auckland City":
              p.lat=-36.848461;
              p.lon=174.763336;
              break;
            case "Bay of Plenty":
              p.lat=-37.683334;
              p.lon=176.566672;
              break;
            case "Central":
              p.lat=-39.4788027;
              p.lon=175.0330237;
              break;
            case "Canterbury":
              p.lat=-43.525650;
              p.lon=172.639847;
              break;
            case "Counties/Manukau":
              p.lat=-37.20213;
              p.lon=174.903513;
              break;
            case "Eastern":
              p.lat=-39.06264678;
              p.lon=177.03978310;
              break;
            case "Northland":
              p.lat=-35.4000;
              p.lon=173.8000;
              break;
            case "Southern":
              p.lat=-45.6465045;
              p.lon=168.5113075;
              break;
            case "Tasman":
              p.lat=-41.4351669;
              p.lon=172.3557036;
              break;
            case "Waikato":
              p.lat=-37.78333;
              p.lon=175.28333;
              break;
            case "Waitemata":
              p.lat=-36.8299;
              p.lon=174.7378;
              break;
            case "Wellington":
              p.lat=-41.276825;
              p.lon=174.777969;
              break;
            default:
              p.lat=-44.6210017;
              p.lon=178.9078565;
              break;
          }

          p.z = p.magnitude;
          data.push(p);
      });

      chart = Highcharts.mapChart(map_container, {
          title: {
              text: ''
          },

          tooltip: {
              pointFormat: '{point.location}<br>' +
                  'Count: {point.magnitude}'
          },

          series: [{
              name: 'Basemap',
              mapData: map,
              borderColor: '#606060',
              nullColor: 'rgba(200, 200, 200, 0.2)',
              showInLegend: false
          }, {
              type: 'mapbubble',
              name: 'Cities',
              data: data,
              maxSize: '12%',
              color: H.getOptions().colors[0]
          }]
      });
  });
}

generateMapChart('/last-week-location-count.json','week-map-container');
generateMapChart('/last-month-location-count.json','month-map-container');
generateMapChart('/all-time-location-count.json','all-time-map-container');
