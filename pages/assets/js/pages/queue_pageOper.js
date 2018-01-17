var taskTable = document.getElementById('taskTable');
var queueTableContent = '';

helper_db.pendingTasks().then(function( result ) {
	console.log(result[ 0 ]);
	// handle result
	queueTableContent = '<table class="table">' +
		'<thead>' +
		'<tr>' +
		'<th></th>' +
		'<th>Start Date</th>' +
		'<th>Task</th>' +
		'<th>Action</th>' +
		// '<th>Start Date</th>' +
		'<th>Runtime</th>' +
		// '<th>Action</th>' +
		'</tr>' +
		'</thead><tbody>';
	for (var i = 0; i < (result.length); i++) {
		queueTableContent += '<tr>';
		if(result[ i ].doc.status === "P"){
			queueTableContent += '<td><button onclick="changeTaskStatusToStop(\'' +
				result[ i ].doc._id + '\')" class="btn btn-sm btn-warning">Pause</button>';
		}else{
			queueTableContent += '<td><button onclick="changeTaskStatusToPending(\'' +
				result[ i ].doc._id + '\')" class="btn btn-sm btn-primary">Resume</button>';
		}

		queueTableContent += '<td>' +
			result[ i ].doc.executionDatetime || Date.now() +
			'</td>';
		queueTableContent += '<td>' + result[ i ].doc.taskName || "" +
			'</td>';
		queueTableContent += '<td>' + result[ i ].doc.actionName || "" +
			'</td>';
		queueTableContent += '<td>' +
			result[ i ].doc.executionDatetime || Date.now()+
			'</td>';

		// queueTableContent += '<td>' +
		// 	result[ i ].doc.status +
		// 	'</td>';
		queueTableContent += '</tr>';
	}
	queueTableContent += '</tbody></table>';

	document.getElementById('taskTable').innerHTML = queueTableContent;
}).catch(function( err ) {
	console.log(err);
});

function changeTaskStatusToStop ( id ) {
	db.get(id).then(data => {
		data.status = "S"
		db.put(data).then(data => {
			console.log(data);
			$('#queue').click();
		});
	});
}

function changeTaskStatusToPending ( id ) {
	db.get(id).then(data => {
		data.status = "P";
		db.put(data).then(data => {
			console.log(data);
			$('#queue').click();
		});
	});
}