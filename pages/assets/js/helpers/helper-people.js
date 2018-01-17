nightmare = require('./helper-nightmare.js');
var self = module ? module.exports = {

	cleanPeoplesTable: async () => {
		document.getElementById("refresh-list").disabled = true;
		$('#refreshing-people-list').modal('show');
		let result = await table_people.allDocs();
		let records = await result.rows.map(function( row ) {
			return table_people.remove(row.id , row.value.rev);
		});
		setTimeout(function() {
			self.scrapProfileOfPeople();
		} , 1000);
	} ,

	scrapProfileOfPeople: async () => {
		await  helper_nightmare.scrapAllConnectionsOnFirstLogin();
		$('#refreshing-people-list').modal('hide');
		$('#people').click();
	} ,

	scrapProfileOfConnection: async ( link ) => {
		await nightmare.retriveProfileOfConnection(link);
	}

} : null;