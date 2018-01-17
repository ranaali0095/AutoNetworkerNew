function saveTableAutomation(docs) {
    return table_automation.put(docs);
}

function bulkDataTableAutomaion(docs) {
    return table_automation.bulkDocs(docs);
}

function getAllTableAutomation() {
	return table_automation.allDocs({
		include_docs: true
	});
}

function getAllTableMessageTemplate() {
	return table_message_template.allDocs({
		include_docs: true
	});
}


function getDataTableAutomation(idVal) {
	return table_automation.get(idVal);
}