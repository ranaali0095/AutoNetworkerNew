let webview = require('./helper-webview.js')
	, db = require('./helper-db.js')
	, moment = require('moment')
	, constants = require('./constants.js')
	, task = require('./helper-task.js');

var self = module ? module.exports = {
	addNewTasks: async (
		source , actionName , getAllPages , fields , taskName , executionDatetime ,
		profileUrl , url , profile ) => {

		profileUrl ? url = profileUrl : null;
		profile ? url = null : null;
		!url && !profile ? url = await webview.retrieveCurrentURL() : null;

		let tasks = []
			//TODO: Retrieve from config maximum number of pages allowed
			, max = getAllPages ? 1 : 1
			, nextTaskId = await db.nextTaskId();
		console.log('nextTaskId ',nextTaskId)
		for (var index = 0; index < max; index++) {
			console.log(index+1)
			let task = {}
					, pageIndex = index + 1;
			task.type = constants.DOC_TYPE.TASK;
			task.status = constants.TASK_STATUS.PENDING;
			task._id = constants.DOC_TYPE.TASK + nextTaskId
			task.aid = index == 0 ? null : index;
			task.source = source;
			task.actionName = actionName;
			task.taskName = taskName
				? taskName
				: getAllPages
					? 'Get Profiles - All Pages'
					: 'Get Profiles - Current Page';
			task.url = profileUrl ? profileUrl : (index > 0 ? url + '&page=' +
				pageIndex : url);
			task.action = index > 0 ? 'GetProfiles-Page' + pageIndex : 'GetProfiles';
			task.fields = fields;
			task.message = fields && fields.message ? fields.message : '';
			task.executionDatetime = executionDatetime;
			task.profile = profile;
			tasks.push(task);
			// await db.saveCollection(task);
		}
		console.log('tasks' , tasks);
		await db.addCollection(tasks);

	} ,
	addNewTaskWhenAutomationEveryone: async ( profile , url ) => {
		console.log('add new task for every one');
		console.log(profile);
		let automations = profile
			? profile.people_automations.p_automation_name
			: []
			, profileUrl = profile ? profile.link : null;
		automations = await db.findAllAutomationsById(automations);
		await new Promise(resolve => {
			(async function nextAutomation ( index ) {
				let automation = automations[ index ]
					, triggers = automation.automation_triggers
					, automation_name = automation.automation_name;
				await new Promise(resolv => {
					(async function nextTrigger ( i ) {
						let actions = triggers[ i ].trigger_action
							, trigger = triggers[ i ]
							, trigger_style = self.triggerStyle(trigger.trigger_style);
						if ( trigger_style == constants.TRIGGER_STYLE.EVERYONE ) {
							await new Promise(resol => {
								(async function nextAction ( c ) {
									let action = actions[ c ]
										, action_style = self.actionStyle(action.action_style)
										, executionDatetime = self.calculateExecutionDatetime(
										action.action_delay_time)
										, actionName = self.actionName(action.action_style)
										, fields = null;
									if ( action.action_parameter &&
										action.action_parameter.content ) {
										fields = {};
										let message = action.action_parameter.content;
										fields.message = message.message_text;
									}

									if ( action.action_parameter &&
										!action.action_parameter.content ) {
										fields = {};
										console.log(action.action_parameter);
										fields.people_tags = {};
										fields.people_tags.p_tag = action.action_parameter;
									}

									console.log('trigger_style:' + trigger_style);
									console.log('action_style ' + action_style);
									console.log('url ' + url);
									console.log('profileUrl ' + profileUrl);
									console.log('actionName ' + actionName);
									console.log('executionDatetime ' + executionDatetime);
									console.log('action_delay_time ' + action.action_delay_time);

									self.addNewTasks('Automation' , actionName , false , fields ,
										automation_name , executionDatetime , profileUrl , url);
									if ( c == actions.length - 1 ) {
										resol();
									} else {
										nextAction(++c);
									}
								})(0);
							});
						}
						if ( i == triggers.length - 1 ) {
							resolv();
						} else {
							nextTrigger(++i);
						}
					})(0);
				});
				if ( index == automations.length - 1 ) {
					resolve(automations);
				} else {
					nextAutomation(++index);
				}
			})(0);
		});
	} ,
	actionStyle: ( action_style_id ) => {
		let key = Object.keys(constants.ACTION_STYLE)[ action_style_id ];
		return constants.ACTION_STYLE[ key ];
	} ,
	triggerStyle: ( trigger_id ) => {
		let key = Object.keys(constants.TRIGGER_STYLE)[ trigger_id ];
		return constants.TRIGGER_STYLE[ key ];
	} ,
	calculateExecutionDatetime: ( delay ) => {
		let executionDatetime = null
			, delayName = delay.split(' ')[ 1 ]
			, delayDuration = delay.split(' ')[ 0 ];
		executionDatetime = delayName == constants.DELAYS.MINUTES
			? new moment().add(delayDuration , 'minutes')
			: executionDatetime;
		executionDatetime = delayName == constants.DELAYS.HOURS ? new moment().add(
			delayDuration , 'hours') : executionDatetime;
		executionDatetime = delayName == constants.DELAYS.DAYS ? new moment().add(
			delayDuration , 'days') : executionDatetime;
		executionDatetime = delayName == constants.DELAYS.WEEKS ? new moment().add(
			delayDuration , 'weeks') : executionDatetime;
		executionDatetime = delayName == constants.DELAYS.MONTHS ? new moment().add(
			delayDuration , 'months') : executionDatetime;
		return executionDatetime.format();
	}
	, actionName: ( action_style_id ) => {
		let key = Object.keys(constants.ACTION_STYLE)[ action_style_id ];
		return constants.ACTION_NAME[ key ];
	}
} : null;
//TODO: remove when production
global.helper_task = self;