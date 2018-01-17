// function saveTableUserAccount(docs) {
//     return table_user_account.put(docs).then(function(response) {
//         // handle response
//         alert('Profile Saved');
//         console.log(response);
//         return true;
//     }).catch(function(err) {
//         alert('Operation Failed');
//         console.log(err);
//         return false;
//     });
// }
function saveTableUserAccount ( docs ) {
	// return table_user_account.put(docs);
	return db.put(docs);
}
