let db = require('./helper-db.js')
	, nightmare = require('./helper-nightmare.js')
	, webview = require('./helper-webview.js')
	, schedule = require('./helper-schedule.js')
	, monitor = require('./helper-monitor.js')
	, helper = require('./helper.js')
	, linkedin = require('./helper-linkedin')

var self = module ? module.exports = {
	initialize: async () => {

		let profile = await nightmare.scrapProfile();
		if ( profile && profile.userName ) {
			let avatar = profile.userAvatar
				? await helper.toDataURL(profile.userAvatar)
				: 'assets/img/ghost-person.svg'
				, dbUserInfo = await db.retrieveLoginInfo();

			if ( dbUserInfo != null ) {
				console.log('result retrieveUserNameAndAvatar' , dbUserInfo);
				$('.sidebar-header div:last').text(profile.userName);
				console.log('Profile' + profile.userName + "      " +
					avatar);
				$('.sidebar-header img').attr('src' , avatar);
				dbUserInfo.avatar = avatar;
				dbUserInfo.userName = profile.userName;
				db.saveCollection(dbUserInfo);
				checkPayment(dbUserInfo);
				schedule.initialize();
				monitor.initialize();
			}
		}
	} ,
	checkLogin: async () => {
		let dbUserInfo = await db.retrieveLoginInfo();
		if ( dbUserInfo != null ) {
			$('#database-exist').modal('show');
		} else {
			$('#database-not-exist').modal('show');
		}
	} ,
	cleanDatabase: () => {
		db.cleanDatabase();
		linkedin.clearSessions();
		$('#database-exist').modal('hide');
	} ,
	saveAccount: async () => {
		var account_email = document.getElementById('account_email');
		var account_password = document.getElementById('account_password');

		if ( (validateInputBox(account_email)) &&
			(validateInputBox(account_password)) ) {
			var doc = {
				_id: constants.DOC_TYPE.USERINFO ,
				user_email: account_email.value ,
				account_password: account_password.value
			};

			document.getElementById("account_save_btn").disabled = true;
			self.afterSucessfullLogin(doc);

		} else {
			alert('Please Complete Profile');
			return;
		}
	} ,

	afterSucessfullLogin: async ( user ) => {

		$('#login-waiting-msg').show();
		//Inserting Document
		nightmare.initialize();
		let result = await  nightmare.loginUserUsingDBCredentials(user);
		// await  nightmare.closeNightmare();

		$('#login-waiting-msg').hide();
		if ( result.status ) {

			$('#login-scrap-msg').show();
			$('#login-scrap-msg').
				text(
					'Please wait! application is trying fetch user details.');
			let profile = await nightmare.scrapProfile();

			if ( profile && profile.userName ) {
				let avatar = profile.userAvatar
					? await helper.toDataURL(profile.userAvatar)
					: 'assets/img/ghost-person.svg'
					, dbUserInfo = await db.retrieveLoginInfo();

				if ( dbUserInfo != null ) {
					//console.log('result retrieveUserNameAndAvatar',result);
					$('.sidebar-header div:last').text(profile.userName);
					$('.sidebar-header img').attr('src' , avatar);
					dbUserInfo.avatar = avatar;
					dbUserInfo.userName = profile.userName;
					db.saveCollection(dbUserInfo);

					checkPayment(dbUserInfo);

					$('#login-scrap-msg').
						text(
							'Please wait! application is trying to sync your connections.');
					let profiles = await nightmare.scrapAllConnectionsOnFirstLogin();
					$('#login-scrap-msg').hide();
					schedule.initialize();
					monitor.initialize();
					// linkedin.firstLoginHandler();
					$('#login-error-msg').hide();
					$('#database-not-exist').modal('hide');
				}
			}
			return;
		} else {
			document.getElementById("account_save_btn").disabled = false;
			$('#login-error-msg').show();
			return;
		}
	} ,

	afterCancelCleaning: async () => {

		let dbUserInfo = await db.retrieveLoginInfo();
		if ( dbUserInfo != null ) {
			//console.log('result retrieveUserNameAndAvatar',result);
			$('.sidebar-header div:last').text(dbUserInfo.userName);
			$('.sidebar-header img').attr('src' , dbUserInfo.avatar);

			// checkPayment(dbUserInfo);
			await  nightmare.initialize();
			schedule.initialize();
			monitor.initialize();
			$('#login-error-msg').hide();
			$('#database-not-exist').modal('hide');
		}
	}
} : null;