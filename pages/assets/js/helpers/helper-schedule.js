let constants = require('./constants.js')
	, db = require('./helper-db.js')
	, nightmare = require('./helper-nightmare.js')
	, mustache = require('mustache')
	, task = require('./helper-task.js');

var self = module != undefined ? module.exports = {
	initialize: () => {
		self.schedule();
		self.checkScheduleIsAlive();
	} ,
	schedule: async () => {
		self.keepAlive();
		if ( nightmare.isInitialized ) {
			let pendingTask = {};
			pendingTask = await db.nextPendingTask();
			self.keepAlive();
			if ( pendingTask.actionName ) {
				console.log(pendingTask);
				let isUrlLoaded = await nightmare.loadUrl(pendingTask.url);
				console.log(isUrlLoaded);
				self.keepAlive()
					, isProfilePage = pendingTask.url.indexOf('/in/') != -1
					, isSearchPage = pendingTask.url.indexOf('search/results') != -1
					, isSalesSearchPage = pendingTask.url &&
					pendingTask.url.indexOf('sales/search') != -1
					, isSalesProfilePage = pendingTask.url &&
					pendingTask.url.indexOf('sales/profile') != -1
					, profiles = isProfilePage || isSearchPage || isSalesSearchPage ||
				isSalesProfilePage ? await nightmare.retrieveProfilesCurrentPage(
					pendingTask) : null;
				//,profileId = isProfilePage ? pendingTask.url.split('/in/').slice(-1).join('').replace('/','') : ''
				//,profile = isProfilePage ? await table_people.get(profileId) : null
				//profile = !profile && pendingTask.profile ? pendingTask.profile : null
				//profile ? (profiles = [], profiles.push(profile)) : null
				profiles = pendingTask.actionName
					? await self[ pendingTask.actionName ](pendingTask , profiles)
					: null;
				self.keepAlive();
				profiles && profiles.length > 0
					? await db.addPeopleCollection(profiles)
					: null;
				//change task status to COMPLETED
				pendingTask.status = constants.TASK_STATUS.COMPLETED;
				await db.addOne(pendingTask , profiles);
				//self.keepAlive()
				// console.log('schedule now alive', pendingTask, 'isUrlLoaded:'+isUrlLoaded, "retrieved profiles", profiles)
			} else {
				console.log('No has pending tasks.');
			}
		} else {
			//TODO:BEFORE PUSH
			nightmare.initialize();
		}
	} ,
	checkScheduleIsAlive: () => {
		//TODO:BEFORE PUSH
		let intervalTimeout = constants.ONE_MINUTE;
		// let intervalTimeout = constants.HALF_MINUTE;
		setInterval(() => {
			let now = new Date();
			console.log('checkScheduleIsAlive' , self.scheduleLastRunTime , now -
				self.scheduleLastRunTime , intervalTimeout);
			if ( now - self.scheduleLastRunTime >= intervalTimeout ) {
				self.schedule();
				console.log("schedule run after " + intervalTimeout + " milliseconds.");
			}
		} , intervalTimeout);
	} ,
	keepAlive: () => {
		self.scheduleLastRunTime = new Date();
		// console.log('keepAlive', self.scheduleLastRunTime)
	} ,
	scheduleLastRunTime: new Date() ,
	searchResults: async ( pendingTask , profiles ) => {
		if ( (pendingTask.taskName.includes('All Pages')) ) {
			self.keepAlive();
			profiles = await  helper_nightmare.retrieveProfilesAllPages(pendingTask);
			return profiles;
		} else {
			return profiles;
		}
	} ,
	addTag: async ( pendingTask , profiles ) => {

		if ( (pendingTask.taskName.includes('All Pages')) ) {
			self.keepAlive();
			profiles = await  helper_nightmare.retrieveProfilesAllPages(pendingTask);
			self.keepAlive();
			return new Promise(resolve => {
				profiles.forEach(function( item , i ) {
					console.log(pendingTask.people_tags);
					item.people_tags.p_tag = item.people_tags.p_tag.concat(
						pendingTask.fields.people_tags.p_tag);
					if ( i == profiles.length - 1 ) {
						resolve(profiles);
					}
				} , this);
			});
		} else {
			return new Promise(resolve => {
				profiles.forEach(function( item , i ) {
					console.log(pendingTask.people_tags);
					item.people_tags.p_tag = item.people_tags.p_tag.concat(
						pendingTask.fields.people_tags.p_tag);
					if ( i == profiles.length - 1 ) {
						resolve(profiles);
					}
				} , this);
			});
		}
		// return new Promise(resolve => {
		// 	profiles.forEach(function( item , i ) {
		// 		console.log(pendingTask.people_tags);
		// 		item.people_tags.p_tag = item.people_tags.p_tag.concat(
		// 			pendingTask.fields.people_tags.p_tag);
		// 		if ( i == profiles.length - 1 ) {
		// 			resolve(profiles);
		// 		}
		// 	} , this);
		// });
	} ,
	addAutomations: async ( pendingTask , profiles ) => {
		// let addNewTaskWhenAutomationEveryone = await function(profile, url){
		//     task.addNewTaskWhenAutomationEveryone(profile, url)
		// }

		if ( (pendingTask.taskName.includes('All Pages')) ) {
			self.keepAlive();
			profiles = await  helper_nightmare.retrieveProfilesAllPages(pendingTask);
			return profiles && profiles.length > 0 ? new Promise(resolve => {
				profiles.forEach(function( profile , i ) {
					console.log(profile);
					console.log(pendingTask);
					{people_automations:{p_automation_name:[];}}
					profile.people_automations.p_automation_name = profile.people_automations.p_automation_name.concat(
						pendingTask.fields.people_automations.p_automation_name);
					helper_task.addNewTaskWhenAutomationEveryone(profile ,
						pendingTask.url);
					if ( i == profiles.length - 1 ) {
						resolve(profiles);
					}
				} , this);
			}) : profiles;
		} else {
			return profiles && profiles.length > 0 ? new Promise(resolve => {
				profiles.forEach(function( profile , i ) {
					console.log(profile);
					console.log(pendingTask);
					{people_automations:{p_automation_name:[];}}
					profile.people_automations.p_automation_name = profile.people_automations.p_automation_name.concat(
						pendingTask.fields.people_automations.p_automation_name);
					helper_task.addNewTaskWhenAutomationEveryone(profile ,
						pendingTask.url);
					if ( i == profiles.length - 1 ) {
						resolve(profiles);
					}
				} , this);
			}) : profiles;
		}
	} ,
	addToBlackList: async ( pendingTask , profiles ) => {
		return new Promise(resolve => {
			profiles.forEach(function( item , i ) {
				item.people_blacklist = pendingTask.fields.people_blacklist;
				if ( i == profiles.length - 1 ) {
					resolve(profiles);
				}
			} , this);
		});
	} ,

	sendMessage: async ( pendingTask , profiles ) => {
		return new Promise(resolve => {
			if ( pendingTask.message && profiles.length > 0 ) {
				(async function next ( index ) {
					let profile = profiles[ index ]
						, isMustacheTemplate = pendingTask.message.indexOf('{{') != -1
						, message = '';
					message = isMustacheTemplate ? self.prepareMustacheTemplate(
						pendingTask.message , profile) : pendingTask.message;
					self.keepAlive();
					let status = profile && profile._id
						? await nightmare.sendMessageToProfile(profile._id , message)
						: '';
					console.log('message send status:' + status + ' contact name:' +
						profile.people_full_name);
					console.log('Message ' , message);
					if ( status != 'success' ) {
						//TODO: create task to send message in the future to specific profile url and message
					}
					if ( index == profiles.length - 1 ) {
						resolve(profiles);
					} else {
						//TODO: add delay from config here
						setTimeout(() => {
							next(++index);
						} , constants.TEN_SECOND);
					}
				})(0);
			} else {
				resolve(profiles);
			}
		});
	} ,
	acceptConnectionRequest: async ( pendingTask ) => {
		// console.log('inside acceptConnectionRequest')
		let status = await nightmare.acceptConnectionRequest(
			pendingTask.profile.id);
		return null;
	} ,
	withdrawConnectionRequest: async ( pendingTask , profiles ) => {
		// console.log('inside withdrawConnectionRequest')
		let status = await nightmare.withdrawConnectionRequest(
			pendingTask.profile.id);
		return profiles;
	} ,
	prepareMustacheTemplate: ( template , profile ) => {
		//TODO: check correct profile information to replace
		let values = {};
		values.Contact = {};
		values.Contact.FirstCurrentCompanyName = profile &&
		profile.people_company && profile.people_company.people_company_name
			? profile.people_company.people_company_name
			: '';
		values.Contact.FirstName = profile && profile.people_name_first;
		values.Contact.FirstNameFix = profile && profile.people_name_first;
		values.Contact.TitleIfApplicable = profile && profile.people_title;
		values.Contact.Country = {};
		values.Contact.Country.State = {};
		values.Contact.Country.State.City = profile && profile.people_location;
		values.Contact[ 'SharedGroups-NamesOfTop3' ] = profile &&
			profile.people_mutual_group;
		values.Contact.NoOfSharedGroups = profile && profile.noSharedConnections;
		values.Contact[ 'MutualContacts-NameOfTop3' ] = profile &&
			profile.people_mutual_group;
		values.Contact.NoOfMutualContacts = profile &&
			profile.people_mutual_connection;
		values.Contact.CurrentTitle = profile && profile.people_title;

		return mustache.to_html(template , values);
	} ,
	visitProfile: ( pendingTask , profiles ) => {
		console.log('success');
		return profiles;
	} ,
	sendConnectionRequest: async ( pendingTask , profiles ) => {
		return new Promise(resolve => {
			(async function next ( index ) {
				let profile = profiles[ index ]
					, message = null;
				if ( pendingTask.message ) {
					let isMustacheTemplate = pendingTask.message.indexOf('{{') != -1;
					message = isMustacheTemplate ? self.prepareMustacheTemplate(
						pendingTask.message , profile) : pendingTask.message;
					console.log('Message ' , message);
				}
				self.keepAlive();
				let status = await nightmare.sendConnectionRequestToProfile(
					profile._id , message);
				console.log('message send status:' + status + ' contact name:' +
					profile.people_full_name);
				if ( status != 'success' ) {
					//TODO: create task to send message in the future to specific profile url and message
				}
				if ( index == profiles.length - 1 ) {
					resolve(profiles);
				} else {
					//TODO: add delay from config here
					setTimeout(() => {
						next(++index);
					} , constants.TEN_SECOND);
				}
			})(0);
		});
	} ,
	checkWhoVisitMyProfile: async ( pendingTask ) => {
		console.log('inside checkWhoVisitMyProfile');
		let profiles = await nightmare.profileViews()
			, actions = await db.retrieveAllRelatedAutomation(
			constants.TRIGGER_STYLE.VISITED_MY_PROFILE)
			, tasks = []
			, retrieveAllPages = false;
		actions.length == 0 ? null : (async function nextAction ( i ) {
			let action = actions[ i ]
				, executionDatetime = task.calculateExecutionDatetime(
				action.action_delay_time);
			// console.log('action:'+action.action_style+' index:'+i);
			(async function nextProfile ( j ) {
				let profile = profiles[ j ]
					, fields = null
					, automation_name = undefined
					, profileUrl = undefined
					, url = undefined;

				if ( self.isDefaultAutomationOrProfiveHaveAutomation(profile ,
						action) ) {
					// console.log('profile:'+profile.id+' index:'+j)
					if ( action.action_style ==
						constants.ACTION_NAME.SEND_CONNECTION_REQUEST
						|| action.action_style == constants.ACTION_NAME.SEND_MESSAGE
						|| action.action_style == constants.ACTION_NAME.VISIT_PROFILE
						|| action.action_style == constants.ACTION_NAME.ADD_TAG ) {

						profileUrl = constants.URL.VISIT_PROFILE + profile.id;
						if ( action.action_parameter && action.action_parameter.content ) {
							fields = {};
							let words = action.action_parameter.content.split(' ')
								, wordsLength = words.length
								, wordsHaveId = !isNaN(parseInt(words[ 1 ]))
								, firstsWordIsMessage = words[ 0 ] == 'Message'
								, isMessageFromTemplate = wordsLength == 2 && wordsHaveId &&
								firstsWordIsMessage
								, message = isMessageFromTemplate
								? await db.retrieveMessageTemplate(
									action.action_parameter.content)
								: action.action_parameter.content;
							fields.message = isMessageFromTemplate
								? message.message_text
								: message;
						}
						if ( action.action_parameter &&
							action.action_style == constants.ACTION_NAME.ADD_TAG ) {
							fields = {};
							fields.people_tags = {};
							fields.people_tags.p_tag = action.action_parameter;
						}

						if ( action.action_parameter &&
							action.action_style == constants.ACTION_NAME.VISIT_PROFILE ) {
							fields = {};
							fields.endorseIfConnected = action_parameter;
						}
					}

					if ( action.action_style ==
						constants.ACTION_NAME.WITHDRAW_CONNECTION_REQUEST ) {
						url = constants.URL.WITHDRAW_CONNECTION_REQUEST;
					}

					/*if(action.action_style == constants.ACTION_NAME.ACCEPT_CONNECTION_REQUEST){
							url = constants.URL.ACCEPT_CONNECTION_REQUEST
					}*/
					await task.addNewTasks(action.trigger_style , action.action_style ,
						retrieveAllPages , fields , action.automation_name ,
						executionDatetime , profileUrl , url , profile);
				}
				if ( j == profiles.length - 1 ) {
					if ( i == actions.length - 1 ) {
					} else {
						nextAction(++i);
					}
				} else {
					nextProfile(++j);
				}
			})(0);
		})(0);
	} ,
	existsActionWithThisStyle: async ( actions , action_style ) => {
		return await actions.filter(
			( action ) => { return action.action_style == action_style; });
	} ,
	checkWhoAcceptedMyConnectionRequest: async ( pendingTask ) => {
		console.log('inside checkWhoAcceptedMyConnectionRequest');
		let profiles = await nightmare.profileAcceptedConnections()
			, actions = await db.retrieveAllRelatedAutomation(
			constants.TRIGGER_STYLE.ACCEPTED_MY_CONNECTION_REQUEST)
			, tasks = []
			, retrieveAllPages = false;
		actions.length == 0 ? null : (async function nextAction ( i ) {
			let action = actions[ i ]
				, executionDatetime = task.calculateExecutionDatetime(
				action.action_delay_time);
			// console.log('action:'+action.action_style+' index:'+i);
			(async function nextProfile ( j ) {
				let profile = profiles[ j ]
					, fields = null
					, automation_name = undefined
					, profileUrl = undefined
					, url = undefined;
				// console.log('profile:'+profile.id+' index:'+j)
				if ( self.isDefaultAutomationOrProfiveHaveAutomation(profile ,
						action) ) {
					if ( action.action_style == constants.ACTION_NAME.SEND_MESSAGE ) {
						profileUrl = constants.URL.VISIT_PROFILE + profile.id;
						if ( action.action_parameter && action.action_parameter.content ) {
							fields = {};
							let words = action.action_parameter.content.split(' ')
								, wordsLength = words.length
								, wordsHaveId = !isNaN(parseInt(words[ 1 ]))
								, firstsWordIsMessage = words[ 0 ] == 'Message'
								, isMessageFromTemplate = wordsLength == 2 && wordsHaveId &&
								firstsWordIsMessage
								, message = isMessageFromTemplate
								? await db.retrieveMessageTemplate(
									action.action_parameter.content)
								: action.action_parameter.content;
							fields.message = isMessageFromTemplate
								? message.message_text
								: message;
						}
					}

					await task.addNewTasks(action.trigger_style , action.action_style ,
						retrieveAllPages , fields , action.automation_name ,
						executionDatetime , profileUrl , url , profile);
				}

				if ( j == profiles.length - 1 ) {
					if ( i == actions.length - 1 ) {
					} else {
						nextAction(++i);
					}
				} else {
					nextProfile(++j);
				}
			})(0);
		})(0);
	} ,
	checkWhoSentConnectionRequestToMe: async ( pendingTask ) => {
		console.log('inside checkWhoSentConnectionRequestToMe');
		let profiles = await nightmare.profileSentConnectionRequestToMe()
			, actions = await db.retrieveAllRelatedAutomation(
			constants.TRIGGER_STYLE.SENT_A_CONNECTION_REQUEST_TO_ME)
			, tasks = []
			, retrieveAllPages = false;
		actions.length == 0 || profiles.length == 0
			? null
			: (async function nextAction ( i ) {
				let action = actions[ i ]
					, executionDatetime = task.calculateExecutionDatetime(
					action.action_delay_time);
				// console.log('action:'+action.action_style+' index:'+i);
				(async function nextProfile ( j ) {
					let profile = profiles[ j ]
						, fields = null
						, automation_name = undefined
						, profileUrl = undefined
						, url = undefined;
					// console.log('profile:'+profile.id+' index:'+j)
					if ( self.isDefaultAutomationOrProfiveHaveAutomation(profile ,
							action) ) {
						if ( action.action_style == constants.ACTION_NAME.SEND_MESSAGE ) {
							profileUrl = constants.URL.VISIT_PROFILE + profile.id;
							if ( action.action_parameter && action.action_parameter.content ) {
								fields = {};
								let words = action.action_parameter.content.split(' ')
									, wordsLength = words.length
									, wordsHaveId = !isNaN(parseInt(words[ 1 ]))
									, firstsWordIsMessage = words[ 0 ] == 'Message'
									, isMessageFromTemplate = wordsLength == 2 && wordsHaveId &&
									firstsWordIsMessage
									, message = isMessageFromTemplate
									? await db.retrieveMessageTemplate(
										action.action_parameter.content)
									: action.action_parameter.content;
								fields.message = isMessageFromTemplate
									? message.message_text
									: message;
							}
						}

						if ( action.action_style ==
							constants.ACTION_NAME.ACCEPT_CONNECTION_REQUEST ) {
							url = constants.URL.ACCEPT_CONNECTION_REQUEST;
						}
						await task.addNewTasks(action.trigger_style , action.action_style ,
							retrieveAllPages , fields , action.automation_name ,
							executionDatetime , profileUrl , url , profile);
					}

					if ( j == profiles.length - 1 ) {
						if ( i == actions.length - 1 ) {
						} else {
							nextAction(++i);
						}
					} else {
						nextProfile(++j);
					}
				})(0);
			})(0);
	} ,
	checkWhoSentMessageToMe: async ( pendingTask ) => {
		console.log('inside checkWhoSentMessageToMe');
		let threads = await nightmare.threadPeopleSentMessageToMe();
		self.keepAlive()
			, actions = await db.retrieveAllRelatedAutomation(
			constants.TRIGGER_STYLE.SENT_A_MESSAGE_TO_ME);
		self.keepAlive()
			, tasks = []
			, retrieveAllPages = false;
		actions.length == 0 || threads.length == 0
			? null
			: (async function nextAction ( i ) {
				let action = actions[ i ]
					, executionDatetime = task.calculateExecutionDatetime(
					action.action_delay_time);
				(async function nextThread ( j ) {
					let thread = threads[ j ]
						, fields = null
						, automation_name = undefined
						, profileUrl = undefined
						, url = undefined
						, profile = await nightmare.retrieveProfileFromMessaging(thread.id);
					if ( self.isDefaultAutomationOrProfiveHaveAutomation(profile ,
							action) ) {
						if ( action.action_style == constants.ACTION_NAME.SEND_MESSAGE ) {
							self.keepAlive();
							profileUrl = constants.URL.VISIT_PROFILE + profile;
							profile = undefined;
							if ( action.action_parameter && action.action_parameter.content ) {
								fields = {};
								let words = action.action_parameter.content.split(' ')
									, wordsLength = words.length
									, wordsHaveId = !isNaN(parseInt(words[ 1 ]))
									, firstsWordIsMessage = words[ 0 ] == 'Message'
									, isMessageFromTemplate = wordsLength == 2 && wordsHaveId &&
									firstsWordIsMessage
									, message = isMessageFromTemplate
									? await db.retrieveMessageTemplate(
										action.action_parameter.content)
									: action.action_parameter.content;
								self.keepAlive();
								fields.message = isMessageFromTemplate
									? message.message_text
									: message;
							}
							await task.addNewTasks(action.trigger_style , action.action_style ,
								retrieveAllPages , fields , action.automation_name ,
								executionDatetime , profileUrl , url , profile);
						}
					}

					if ( j == threads.length - 1 ) {
						if ( i == actions.length - 1 ) {
						} else {
							nextAction(++i);
						}
					} else {
						nextThread(++j);
					}
				})(0);
			})(0);

	} ,
	checkWhoEndorsedMe: async ( pendingTask ) => {
		console.log('inside checkWhoEndorsedMe');
		let profiles = await nightmare.profileEndorsedMe();
		self.keepAlive();
		let actions = await db.retrieveAllRelatedAutomation(
			constants.TRIGGER_STYLE.ENDORSED_ME);
		self.keepAlive();
		let tasks = []
			, retrieveAllPages = false;
		actions.length == 0 || profiles == ''
			? null
			: (async function nextAction ( i ) {
				let action = actions[ i ]
					, executionDatetime = task.calculateExecutionDatetime(
					action.action_delay_time);
				// console.log('action:'+action.action_style+' index:'+i);
				let fields = null
					, automation_name = undefined
					, profileUrl = undefined
					, url = undefined
					, profile = undefined;
				// console.log('profile:'+profile.id+' index:'+j)
				if ( self.isDefaultAutomationOrProfiveHaveAutomation(profile , action) ) {
					if ( action.action_style == constants.ACTION_NAME.SEND_MESSAGE ) {
						url = constants.URL.VISIT_PROFILE + profiles;
						profile = undefined;
						if ( action.action_parameter && action.action_parameter.content ) {
							fields = {};
							let words = action.action_parameter.content.split(' ')
								, wordsLength = words.length
								, wordsHaveId = !isNaN(parseInt(words[ 1 ]))
								, firstsWordIsMessage = words[ 0 ] == 'Message'
								, isMessageFromTemplate = wordsLength == 2 && wordsHaveId &&
								firstsWordIsMessage
								, message = isMessageFromTemplate
								? await db.retrieveMessageTemplate(
									action.action_parameter.content)
								: action.action_parameter.content;
							self.keepAlive();
							fields.message = isMessageFromTemplate
								? message.message_text
								: message;
						}
						await task.addNewTasks(action.trigger_style , action.action_style ,
							retrieveAllPages , fields , action.automation_name ,
							executionDatetime , profileUrl , url , profile);
						self.keepAlive();
					}
				}

				if ( i == actions.length - 1 ) {
				} else {
					nextAction(++i);
				}
			})(0);
	} ,
	isDefaultAutomationOrProfiveHaveAutomation: async (
		profileFromPage , action ) => {
		let profileFromDB = await global.db.findOnePeople(profileFromPage.id)
			, profileContainsAutomation = profileFromDB
			? profileFromPage.people_automations.p_automation_name.filter(
			( id ) => {return id == action.automation_id;}).length == 1
			: false
			, defaultAutomation = await db.docById(constants.DOC_TYPE.SETTINGS);
		defaultAutomation = defaultAutomation
			? defaultAutomation.default_automations
			: null;
		let isDefaultAutomation = defaultAutomation ? defaultAutomation.id ==
			action.automation_id : false;
		return profileContainsAutomation || isDefaultAutomation;
	} ,
	firstLoginRetrieveProfiles: async () => {
		await nightmare.retrieveAllConnectionsWhenFirstLogin();
	}
} : null;

global.keepAlive = self.keepAlive;