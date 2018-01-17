let nightmare = require('./helper-nightmare.js')
	, webview = require('./helper-webview.js')
	, db = require('./helper-db.js')
	, schedule = require('./helper-schedule.js')
	, moment = require('moment')
	, task = require('./helper-task.js')
	, constants = require('./constants.js')
	, helper = require('./helper.js');

const { session } = require('electron').remote;

var self = module != undefined ? module.exports = {
	initialize: () => {
		document.querySelector('webview').
			addEventListener('did-stop-loading' , self.webviewDidStopLoadingHandler);
		document.getElementById('messageBulkAction').
			addEventListener('click' , self.messageBulkActionHandler);
		document.getElementById('tagsBulkAction').
			addEventListener('click' , self.tagsBulkActionHandler);
		document.getElementById('automationsBulkAction').
			addEventListener('click' , self.automationsBulkActionHandler);
	} ,
	retrieveSelectedValuesForBulkAction: ( $popup ) => {
		return $popup.find('select').val();
	} ,
	webviewDidStopLoadingHandler: () => {
		webview.addFeatureToLinkedinPage(webview.persistCredentials , false);
		webview.addFeatureToLinkedinPage(webview.getCookie);
		webview.retrieveUserNameAndAvatar();
		document.getElementById('btnGetProfiles').
			addEventListener('click' , self.btnGetProfilesHandler);
		document.getElementById('btnAddToBlackList').
			addEventListener('click' , self.btnAddToBlackListHandler);
		self.triggerActionHandler();
		// helper.retrieveAndSaveCookies(constants.URL.BASE_URL);
	} ,
	btnGetProfilesHandler: ( e ) => {
		// let allPagesChecked = helper.checkGetAllPagesChecked($(e.target));
		let allPagesChecked = false;
		if ( !$('#getProfCur').is(":checked") ) {
			allPagesChecked = true;
		}
		if ( !$('#getProfProfileCur').is(":checked") ) {
			allPagesChecked = false;
		}
		task.addNewTasks('Search Results' , constants.ACTION_NAME.SEARCH_RESULTS ,
			allPagesChecked);
	} ,
	btnAddToBlackListHandler: ( e ) => {
		let allPagesChecked = helper.checkGetAllPagesChecked($(e.target));
		let fields = { people_blacklist: true };
		task.addNewTasks('Add to BalckList' , constants.ACTION_NAME.ADD_BLACK_LIST ,
			allPagesChecked , fields);
	} ,
	messageBulkActionHandler: ( e ) => {
		console.log('message Handler');
		let $popup = $('#modal-input-messages');
		let selectedValues = self.retrieveSelectedValuesForBulkAction($popup);
		let allPagesChecked = helper.checkGetAllPagesChecked($(e.target));
		allPagesChecked = false;
		if ( !$('#sendMessageCur').is(":checked") ) {
			allPagesChecked = true;
		}

		if ( !$('#sendMessageProfileCur').is(":checked") ) {
			allPagesChecked = false;
		}

		if ( selectedValues ) {
			let messageFromTemplate = $popup.find('select:first').val() ==
				'selectFromTemplate';
			let fields = {};
			console.log(document.getElementById(
				'sendRecomRequestTextListLI').style.display);
			fields.message = $popup.find('textarea').val().trim();
			if ( document.getElementById(
					'sendRecomRequestSelectCustomLI').style.display !== "none" ) {
				fields.message = $('#sendRecomRequestSelectCMLI').val().trim();
			}
			console.log(fields);
			if ( fields.message ) {
				task.addNewTasks('Send Message' , constants.ACTION_NAME.SEND_MESSAGE ,
					allPagesChecked , fields);
				$popup.modal('hide');
			}
		}
	} ,
	tagsBulkActionHandler: ( e ) => {
		// let allPagesChecked = helper.checkGetAllPagesChecked($(e.target));
		let allPagesChecked = false;
		if ( !$('#addTagsCur').is(":checked") ) {
			console.log('all page tag');
			allPagesChecked = true;
		}
		if ( $('#addTagsProfileCur').is(":checked") ) {
			console.log('profile page tag');
			allPagesChecked = false;
		}

		let $popup = $('#modal-input-tags');
		let selectedValues = self.retrieveSelectedValuesForBulkAction($popup);
		console.log(allPagesChecked);
		if ( selectedValues ) {
			let fields = { people_tags: { p_tag: [] } };
			fields.people_tags.p_tag = fields.people_tags.p_tag.concat(
				selectedValues);
			task.addNewTasks('Add Tags' , constants.ACTION_NAME.ADD_TAG ,
				allPagesChecked , fields);
			$popup.modal('hide');
		}
	} ,
	automationsBulkActionHandler: ( e ) => {
		let $popup = $('#modal-input-automations');
		let selectedValues = self.retrieveSelectedValuesForBulkAction($popup);
		let allPagesChecked = helper.checkGetAllPagesChecked($(e.target));
		allPagesChecked = false;
		if ( !$('#addAutomationCur').is(":checked") ) {
			console.log('add automation');
			allPagesChecked = true;
		}

		if ( !$('#addAutomationProfileCur').is(":checked") ) {
			allPagesChecked = false;
		}

		if ( selectedValues ) {
			let fields = { people_automations: { p_automation_name: [] } };
			fields.people_automations.p_automation_name = fields.people_automations.p_automation_name.concat(
				selectedValues);
			console.log(fields);
			task.addNewTasks('Automation' , constants.ACTION_NAME.ADD_AUTOMATIONS ,
				false , fields);
			$popup.modal('hide');
		}
	} ,
	triggerActionHandler: async () => {
		let url = await webview.retrieveCurrentURL()
			, isVisitProfileAction = url.indexOf(constants.URL.VISIT_PROFILE) != -1;
		if ( isVisitProfileAction ) {
			let profileId = url.split('/').slice(-2)[ 0 ]
				, profile = await db.findOnePeople(profileId);
		}
	} ,
	firstLoginHandler: async () => {
		await task.addNewTasks('First Login/Retrieve Profiles' ,
			constants.ACTION_NAME.FIRST_LOGIN_RETRIEVE_PROFILES ,
			getAllPages = false ,
			url = constants.URL.CHECK_WHO_ACCEPTED_MY_CONNECTION_REQUEST);
	} ,
	retrieveAndSaveCookies: async () => {
		let session = document.querySelector('webview').getWebContents().session;
		let cookies = null;
		cookies = await new Promise(resolve => {
			session.cookies.get({
					url: 'https://www.linkedin.com'
				} ,
				( error , cookies ) => {
					resolve(JSON.stringify(cookies));
				});
		});
		let docCookies = {};
		docCookies._id = constants.DOC_TYPE.COOKIES;
		docCookies.value = cookies;
		db.saveCollection(docCookies);
		return cookies;
	} ,
	clearSessions: () => {
		session.defaultSession.cookies.get({} , ( error , cookies ) => {
			cookies.forEach(( cookie ) => {
				let url = '';
				// get prefix, like https://www.
				url += cookie.secure ? 'https://' : 'http://';
				url += cookie.domain.charAt(0) === '.' ? 'www' : '';
				// append domain and path
				url += cookie.domain;
				url += cookie.path;

				session.defaultSession.cookies.remove(url , cookie.name , ( error ) => {
					if ( error ) console.log(`error removing cookie ${cookie.name}` ,
						error);
				});
			});
		});
	} ,

	setWebViewSessions: async () => {
		let user = await db.db.get(constants.DOC_TYPE.USERINFO);
		if ( user ) {
			document.getElementById('foo').
				getWebContents().
				executeJavaScript(
					`document.querySelector('.login-email').value = "${user.user_email}";
				 document.querySelector('.login-password').value = "${user.account_password}";
				  setTimeout(function() {
        document.querySelector('[type=submit]').parentNode.submit()
  				  }, 1000);`).then(( result ) => {
				console.log(result);
			});
		}
	}
} : null;

//TODO: remove when production
global.helper_linkedin = self;