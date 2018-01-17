let db = require('./helper-db.js')
	, helper = require('./helper.js')
	, nightmare = require('./helper-nightmare.js')
	, constants = require('./constants.js');

var self = module != undefined ? module.exports = {
	retrieveLoginInfo: async () => {

		let loginInfo = null;
		//Retrieve credentials from AN
		// console.log('before Retrieve credentials from AN');
		let result = await self.evaluate(self.getLoginAndPasswordFromCookie);
		// console.log('after Retrieve credentials from AN');
		let dbUserInfo = await db.retrieveLoginInfo();
		if ( result && result.login != null ) {

			console.log('not log in');
			// console.log('Retrieve credentials from AN finded', result);
			//Retrieve credentials from db
			//when db's credentials are different to AN's credentials
			if ( dbUserInfo == null || result.login != dbUserInfo.login ||
				result.password != dbUserInfo.password ) {
				result._id = constants.DOC_TYPE.USERINFO;
				db.saveCollection(result);
				result.newCredentials = true;
				nightmare.reload();
			}
			loginInfo = result;
		} else {
			// console.log('Retrieve credentials from AN no found');
			// console.log('before Retrieve credentials from DB');
			// console.log('after Retrieve credentials from DB');
			if ( dbUserInfo == null ) {
				console.log('after Retrieve credentials from DB no found');
			} else {
				// console.lzzog('after Retrieve credentials from DB finded', dbUserInfo);
			}
			loginInfo = dbUserInfo;
		}
		return loginInfo;

	} ,
	addFeatureToLinkedinPage: ( funct , wholeFunction = true ) => {
		funct = wholeFunction ? funct : self.functionToString(funct);
		let skeleton = `${funct.toString()}`;
		//console.log(`before add feature "${funct.name}" ${skeleton}`);
		document.querySelector('webview').
			getWebContents().
			executeJavaScript(skeleton).
			then(( result ) => {
				//console.log(`after add feature "${funct.name}" applied`);
			});
	} ,
	retrieveUserNameAndAvatar: async () => {
		let result = await self.evaluate(self.retrieveProfileAvatarInfo);
		if ( result && result.userName ) {
			let avatar = result.userAvatar
				? await helper.toDataURL(result.userAvatar)
				: 'assets/img/ghost-person.svg'
				, dbUserInfo = await db.retrieveLoginInfo()
				, loginInfo = await self.evaluate(self.getLoginAndPasswordFromCookie);
			loginInfo._id = constants.DOC_TYPE.USERINFO;
			if ( dbUserInfo != null ) {
				//console.log('result retrieveUserNameAndAvatar',result);
				$('.sidebar-header div:last').text(result.userName);
				$('.sidebar-header img').attr('src' , avatar);
				dbUserInfo.avatar = avatar;
				if ( loginInfo && loginInfo.login &&
					dbUserInfo.login != loginInfo.login ) {
					dbUserInfo.newCredentials = true;
				} else {
					dbUserInfo.newCredentials = false;
				}
				if ( loginInfo && loginInfo.login ) {
					dbUserInfo.login = loginInfo.login;
					dbUserInfo.password = loginInfo.password;
				}
				db.saveCollection(dbUserInfo);
			} else {
				loginInfo.login && loginInfo.login != ''
					? db.saveCollection(loginInfo)
					: null;
			}
		}
	} ,
	persistCredentials: () => {
		function handlerKeyEvent ( e ) {
			document.cookie = `user=${document.querySelector('.login-email').value}`;
			document.cookie = `password=${e.target.value}`;
		}

		document.querySelector('.login-password').
			addEventListener('keyup' , ( e ) => {handlerKeyEvent(e);});
	} ,
	getCookie: function getCookie ( name ) {
		let value = `; ${document.cookie}`
			, parts = value.split(`; ${name}=`)
			, response = parts.length == 2 ? parts.pop().split(";").shift() : null;
		return response;
	} ,
	logout: () => {
		self.evaluate(self.logoutAction).then(() => {
			console.log('logout you need make login');
		});
	} ,
	retrieveCurrentURL: () => {
		return self.evaluate('Promise.resolve(window.location.href)');
	} ,
	/**
	 * Example
	 * evaluate('Promise.resolve(document.querySelectorAll(\'.login-email\').length); ').then((result)=>{//console.log(result)})
	 **/
	evaluate: ( $function ) => {
		//console.log('inside evaluate', $function.name, $function);
		let fn = typeof($function) == 'function'
			? self.functionToString($function)
			: $function;
		return new Promise(resolve => {
			let webview = document.querySelector('webview');
			webview ? document.querySelector('webview').
				getWebContents().
				executeJavaScript(fn).
				then(( result ) => {
					resolve(result);
				}) : null;
		});
	} ,
	retrieveProfileAvatarInfo: () => {
		var $user = document.querySelectorAll(
			'.profile-rail-card__actor-meta [data-control-name=identity_welcome_message]')
			, userName = $user.length > 0 ? $user[ 0 ].text.trim() : ''
			, noPhoto = $(
			'.feed-identity-module__actor-meta [data-control-name=identity_add_photo]').length >
			0
			, userAvatar = noPhoto ? '' : document.querySelectorAll(
			'.profile-rail-card__actor-meta .lazy-image')[ 0 ].src
			, isLoginReady = document.querySelectorAll(
			'.profile-rail-card__actor-meta .login-email').length == 0;
		Promise.resolve({
			isLoginReady: isLoginReady ,
			userName: userName ,
			userAvatar: userAvatar
		});
	} ,
	functionToString: ( $function ) => {
		let newFunction = $function.toString().split('\n').slice(1 , -1).join(' ');
		return newFunction;
	} ,
	getLoginAndPasswordFromCookie: () => {
		var login = self.getCookie('user')
			, password = self.getCookie('password');

		console.log('User name' , login);
		Promise.resolve({ login: login , password: password });
	} ,
	logoutAction: () => {
		document.querySelector('[data-control-name="nav.settings"]').click();
		setTimeout(function() {
			document.querySelector('[data-control-name="nav.settings_signout"]').
				click();
		} , 1000);
	} ,

} : null;
