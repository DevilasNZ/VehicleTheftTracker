// Generate the Data Table display for the last 1000 stolen vehicles
$(document).ready( function () {
  $('#data-search-table-table').DataTable({
    autoWidth: false,
    ajax: {
      "url": '/last-1000.json',
      "dataSrc": ''
    },
    columns: [
      {data: 'rego'},
      {data: 'make'},
      {data: 'model'},
      {data: 'year'},
      {data: 'colour'},
      {data: 'date'},
      {data: 'location'},
    ],
    order: [[ 5, "desc" ]]
  });

  $("#newSearchPlace").html($(".dataTables_filter"));
} );
