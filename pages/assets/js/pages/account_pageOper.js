// function saveAccount () {
// 	var account_email = document.getElementById('account_email');
// 	var account_password = document.getElementById('account_password');
// 	// var account_bilName = document.getElementById('account_bilName');
// 	// var account_bilLastName = document.getElementById('account_bilLastName');
// 	var account_countryName = document.getElementById('account_countryName');
// 	var account_mobNumber = document.getElementById('account_mobNumber');
// 	var account_emailAdd = document.getElementById('account_emailAdd');
// 	// if ((validateInputBox(account_email)) && (validateInputBox(account_password)) &&
// 	//     (validateInputBox(account_bilName)) && (validateInputBox(account_bilLastName)) &&
// 	//     (validateInputBox(account_countryName)) && (validateInputBox(account_mobNumber)) &&
// 	//     (validateInputBox(account_emailAdd))) {
//
// 	if ( (validateInputBox(account_email)) &&
// 		(validateInputBox(account_password)) ) {
// 		var doc = {
// 			_id: constants.DOC_TYPE.USERINFO ,
// 			user_email: account_email.value ,
// 			account_password: account_password.value
// 			// account_bilName: account_bilName.value ,
// 			// account_bilLastName: account_bilLastName.value ,
// 			// account_countryName: account_countryName.value ,
// 			// account_mobNumber: account_mobNumber.value ,
// 			// account_emailAdd: account_emailAdd.value
// 		};
// 		//Inserting Document
// 		saveTableUserAccount(doc).then(function( response ) {
// 			alert('Profile Saved');
// 			console.log(response);
// 		}).catch(function( err ) {
// 			alert(err.message);
// 		});
// 	} else {
// 		alert('Please Complete Profile');
// 		return;
// 	}
// }
