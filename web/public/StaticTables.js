var myArray = []

$.getJSON('/last-week-make-model-count.json', function(data){
  buildMakeModelTable(data,'last-week-make-model-count-table')
});
$.getJSON('/last-week-make-count.json', function(data){
  buildMakeTable(data,'last-week-make-count-table')
});
$.getJSON('/last-week-type-count.json', function(data){
  buildTypeTable(data,'last-week-type-count-table')
});

$.getJSON('/last-month-make-model-count.json', function(data){
  buildMakeModelTable(data,'last-month-make-model-count-table')
});
$.getJSON('/last-month-make-count.json', function(data){
  buildMakeTable(data,'last-month-make-count-table')
});
$.getJSON('/last-month-type-count.json', function(data){
  buildTypeTable(data,'last-month-type-count-table')
});

$.getJSON('/all-time-make-model-count.json', function(data){
  buildMakeModelTable(data,'all-time-make-model-count-table')
});
$.getJSON('/all-time-make-count.json', function(data){
  buildMakeTable(data,'all-time-make-count-table')
});
$.getJSON('/all-time-type-count.json', function(data){
  buildTypeTable(data,'all-time-type-count-table')
});

function buildMakeModelTable(data,tableID){
	var table = document.getElementById(tableID)

	for (var i = 0; i < data.length; i++){
		var row = `<tr>
						<td>${data[i].make}</td>
						<td>${data[i].model}</td>
						<td>${data[i].magnitude}</td>
				  </tr>`
		table.innerHTML += row
	}
}

function buildMakeTable(data,tableID){
	var table = document.getElementById(tableID)

	for (var i = 0; i < data.length; i++){
		var row = `<tr>
						<td>${data[i].make}</td>
						<td>${data[i].magnitude}</td>
				  </tr>`
		table.innerHTML += row
	}
}

function buildTypeTable(data,tableID){
	var table = document.getElementById(tableID)

	for (var i = 0; i < data.length; i++){
		var row = `<tr>
						<td>${data[i].type}</td>
						<td>${data[i].magnitude}</td>
				  </tr>`
		table.innerHTML += row
	}
}
