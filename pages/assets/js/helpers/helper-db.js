let db = new PouchDB('db/db001')
	, constants = require('./constants.js');

//No remove, use in pouchdb map reduce
moment = require('moment');

var self = module.exports = {
	db: db ,
	addOne: ( object ) => {
		var deferred = new $.Deferred();
		db.find({
			selector: object.selector ? object.selector : { _id: object._id } ,
			//fields: ['_id', 'email', 'password', '_rev'],
			sort: [ '_id' ]
		}).then(function( result ) {
			result = result.docs[ 0 ];
			if ( result ) {
				object[ '_rev' ] = result._rev;
			}
			db.put(object).then(function() {
				deferred.resolve('success');
				console.log('success' , object , arguments);
			}).catch(function( err ) {
				console.log('error insert pouchdb' , err);
				// some error (maybe a 409, because it already exists?)
			});
		}).catch(function( err ) {
			console.log(err);
		});
		return deferred.promise();
	} ,
	addCollection: ( collection ) => {
		var deferred = new $.Deferred();
		db.bulkDocs(collection).then(function() {
			console.log('success' , arguments);
			deferred.resolve('success');
		}).catch(function( err ) {
			console.log('error insert pouchdb' , err);
			// some error (maybe a 409, because it already exists?)
		});
		return deferred.promise();
	} ,
	addPeopleCollection: async ( collection ) => {
		//let options = {force:true, new_edits: false}
		console.log('inside addPeopleCollection' , collection);
		let collectionSaved = await new Promise(resolve => {
			table_people.bulkDocs(collection).then(function( result ) {
				console.log('addPeopleCollection success' , result);
				resolve(result);
			}).catch(function( err ) {
				console.log('error insert pouchdb' , err);
				// some error (maybe a 409, because it already exists?)
			});
		});
		let collectionAfterRetry = await self.retryUsingUpdate(collection ,
			collectionSaved);
		return collectionAfterRetry;
	} ,

	addPeople: async ( collection ) => {
		//let options = {force:true, new_edits: false}
		return table_people.put(collection);
	} ,

	findAll: ( options ) => {
		var deferred = new $.Deferred();
		let defaultOptions = { include_docs: true , descending: true };
		options
			? Object.assign(options , defaultOptions)
			: (options = defaultOptions);
		db.allDocs(options , function( err , doc ) {
			deferred.resolve(doc.rows);
		});
		return deferred.promise();
	} ,

	findById: ( id ) => {
		var deferred = new $.Deferred();
		db.find({
			selector: { _id: id } ,
			//fields: ['_id', 'email', 'password', '_rev'],
			sort: [ '_id' ]
		}).then(function( result ) {
			// console.log('findById', id,result);
			deferred.resolve(result.docs[ 0 ]);
		}).catch(function( err ) {
			console.log(err);
		});
		return deferred.promise();
	} ,
	onlyNewProfiles: () => {
		var deferred = new $.Deferred();
		db.query('onlyNewProfiles').then(function( result ) {
			// console.log(result);
			deferred.resolve(result.rows);
		});
		return deferred.promise();
	} ,
	nextTaskId: () => {
		return new Promise(resolve => {
			function map ( doc ) {
				if ( doc.type === 'task' ) {
					emit(parseInt(doc._id.replace(constants.DOC_TYPE.TASK , '')));
				}
			}

			db.query(map , { limit: 1 , descending: true }).then(function( result ) {
				let nextId = 1;
				if ( result.rows.length > 0 ) {
					console.log('lastTaskId' , result.rows[ 0 ].id);
					nextId = parseInt(
						result.rows[ 0 ].id.replace(constants.DOC_TYPE.TASK , '')) + 1;
				}
				resolve(nextId);
			}).catch(function( err ) {
				console.log(err);
			});
		});
	} ,
	pendingTasks: () => {
		return new Promise(resolve => {
			function map ( doc ) {
				// if (doc.type === global.constants.DOC_TYPE.TASK && doc.status === global.constants.TASK_STATUS.PENDING) {
				if ( doc.type === global.constants.DOC_TYPE.TASK &&
					doc.status === global.constants.TASK_STATUS.PENDING ||doc.status === global.constants.TASK_STATUS.STOP  &&
					(!doc.executionDatetime || (doc.executionDatetime &&
						moment().isAfter(moment(doc.executionDatetime)))) ) {
					emit(doc._id , doc.aid);
				}
			}

			db.query(map , { include_docs: true }).then(function( result ) {
				resolve(result.rows);
			}).catch(function( err ) {
				console.log(err);
			});
		});
	} ,
	nextPendingTask: () => {
		return new Promise(resolve => {
			function map ( doc ) {
				//if (doc.type === global.constants.DOC_TYPE.TASK && doc.status === global.constants.TASK_STATUS.PENDING) {
				if ( doc.type === global.constants.DOC_TYPE.TASK &&
					doc.status === global.constants.TASK_STATUS.PENDING &&
					(!doc.executionDatetime || (doc.executionDatetime &&
						moment().isAfter(moment(doc.executionDatetime)))) ) {
					emit(parseInt(doc._id.replace(constants.DOC_TYPE.TASK , '')));
				}
			}

			db.query(map , { include_docs: true , limit: 1 , descending: true }).
				then(function( result ) {
					resolve(result.rows.length > 0 ? result.rows[ 0 ].doc : {});
				}).
				catch(function( err ) {
					console.log(err);
				});
		});
	} ,
	retryUsingUpdate: async ( collectionTarget , collection ) => {
		let toUpdate = [];
		await new Promise(resolve => {
			(async function next ( index ) {
				var item = collection[ index ];
				if ( item && item.error && item.name == "conflict" &&
					item.status == 409 ) {
					item = collectionTarget[ index ];
					// console.log('handling bulkDocs item ', item)
					let origDoc = await table_people.get(item._id);
					// console.log('after get doc from db', origDoc)
					//TODO: add all fields to keep info
					item._rev = origDoc._rev;
					// item.people_blacklist = origDoc.people_blacklist
					item.people_tags.p_tag = item.people_tags.p_tag.concat(
						origDoc.people_tags.p_tag);
					item.people_automations.p_automation_name = item.people_automations.p_automation_name.concat(
						origDoc.people_automations.p_automation_name);
					toUpdate.push(item);
				}
				if ( index == collection.length - 1 ) {
					resolve();
				} else {
					setTimeout(() => {
						next(++index);
					} , 1000);
				}
			})(0);
		});
		// console.log(toUpdate.length, toUpdate)
		let retorno = toUpdate.length > 0
			? await table_people.bulkDocs(toUpdate)
			: toUpdate;
		console.log('retryUsingUpdate success ' , retorno);
		return retorno;
	} ,
	removeAllPeople: () => {
		table_people.allDocs().then(function( result ) {
			return Promise.all(result.rows.map(function( row ) {
				return table_people.remove(row.id , row.value.rev);
			}));
		}).then(function() {
			// done!
		}).catch(function( err ) {
			// error!
		});
	} ,
	showAllPeoples: () => {
		return new Promise(resolve => {
			table_people.allDocs({ include_docs: true }).then(function( result ) {
				//console.log(result.rows.filter((item)=>{return item.doc.people_picture != ''}))
				resolve(result.rows);
				//console.log(result.rows.filter((item)=>{return item.doc.people_tags.p_tag.length > 0}))
			}).catch(function( err ) {
				// error!
			});
		});
	} ,
	removeAllPeoples: () => {
		table_people.allDocs().then(function( result ) {
			// Promise isn't supported by all browsers; you may want to use bluebird
			return Promise.all(result.rows.map(function( row ) {
				return table_people.remove(row.id , row.value.rev);
			}));
		}).then(function() {
			// done!
			console.log('removed done!!!');
		}).catch(function( err ) {
			// error!
		});
	} ,

	updateTaskFieldsAndSetToPending: ( doc ) => {
		return new Promise(resolve => {
			if ( !doc._id ) {
				resolve('You must be inform an doc id.');
			} else {
				db.get(doc._id).then(function( docSource ) {
					doc.status
						? docSource.status = doc.status
						: docSource.status = global.constants.TASK_STATUS.PENDING;
					doc.people_automations && docSource.fields.people_automations
						? docSource.fields.people_automations.p_automation_name = doc.people_automations.p_automation_name
						: null;
					doc.url ? docSource.url = doc.url : null;
					doc.executionDatetime
						? docSource.executionDatetime = doc.executionDatetime
						: null;
					db.put(docSource).then(function( doc ) {
						resolve('success' , doc);
						//console.log('success', object, arguments)
					}).catch(function( err ) {
						console.log('error updateTaskToPending' , err);
					});
				}).catch(function( err ) {
					console.log(err);
				});
			}
		});
	} ,
	updateAllTaskToPending: () => {
		return new Promise(resolve => {
			function map ( doc ) {
				if ( doc.type === global.constants.DOC_TYPE.TASK ) {
					emit(doc.aid);
				}
			}

			db.query(map , { include_docs: true }).then(function( result ) {
				return Promise.all(result.rows.map(function( row ) {
					row.doc.status = global.constants.TASK_STATUS.PENDING;
					return db.put(row.doc);
				}));
			}).catch(function( err ) {
				console.log(err);
			});
		});
	} ,

	showAllTask: ( maxResult = 10 ) => {
		return new Promise(resolve => {
			function map ( doc ) {
				if ( doc.type === global.constants.DOC_TYPE.TASK ) {
					emit(parseInt(doc._id.replace(constants.DOC_TYPE.TASK , '')));
				}
			}

			db.query(map , { descending: true , include_docs: true }).
				then(function( result ) {
					resolve(result.rows);
				}).
				catch(function( err ) {
					console.log(err);
				});

		});
	} ,
	removeAllTask: ( keepFirstsMonitor = false ) => {
		global.keepFirstsMonitor = keepFirstsMonitor;

		function map ( doc ) {
			if ( (!global.keepFirstsMonitor && doc.type == constants.DOC_TYPE.TASK) ||
				(global.keepFirstsMonitor &&
					parseInt(doc._id.replace('task' , '') > 5)) ) {
				emit(doc.aid);
			}
		}

		db.query(map , { include_docs: true }).then(function( result ) {
			return Promise.all(result.rows.map(function( row ) {
				return db.remove(row.doc._id , row.doc._rev);
			}));
			console.log('removed done!!!');
		}).catch(function( err ) {
			console.log(err);
		});
	} ,
	findOnePeople: async ( _id ) => {
		let profile = null;
		try {
			profile = await table_people.get(_id);
		} catch ( err ) {
			//console.log(err);
		}
		return profile;
	} ,
	findAutomationById: async ( id ) => {
		let doc = null;
		try {
			doc = await table_automation.get(id);
		} catch ( err ) {
			console.log(err);
		}
		return doc;
	} ,
	findAllAutomationsById: async ( automationIds ) => {
		let automations = [];
		return await new Promise(resolve => {
			(async function next ( index ) {
				let id = automationIds[ index ];
				let automation = await self.findAutomationById(id.toString());
				automations.push(automation);
				if ( index <= automationIds.length - 1 ) {
					resolve(automations);
				} else {
					next(++index);
				}
			})(0);
		});
	} ,
	retrieveAllRelatedAutomation: async ( requiredTriggerStyle ) => {
		global.requiredTriggerStyle = requiredTriggerStyle;

		let actions = await self.onlyActions();

		return actions;
	} ,
	onlyActions: async () => {
		var map = ( doc ) => {
			doc.automation_triggers.filter(( trigger ) => {
				return global.helper_task.triggerStyle(trigger.trigger_style) ==
					global.requiredTriggerStyle;
			}).length > 0 ? emit(doc._id) : null;
		};

		let result = await table_automation.query(map , { include_docs: true });
		return result.rows == 0 ? [] : await result.rows.map(( result ) => {
			let automation = result.doc;
			return automation.automation_triggers.map(( triggers ) => {
				triggers.automation_name = automation.automation_name;
				triggers.automation_id = automation._id;
				return triggers;
			});
		}).reduce(( a , b ) => {return a.concat(b);}).filter(( trigger ) => {
			return global.helper_task.triggerStyle(trigger.trigger_style) ==
				global.requiredTriggerStyle;
		}).map(( trigger ) => {
			return trigger.trigger_action.map(( triggerAction ) => {
				triggerAction.trigger_style = global.helper_task.triggerStyle(
					trigger.trigger_style);
				triggerAction.automation_name = trigger.automation_name;
				triggerAction.automation_id = trigger.automation_id;
				return triggerAction;
			});
		}).reduce(( a , b ) => {
			return a.concat(b);
		}).map(( action ) => {
			action.action_style = global.helper_task.actionName(action.action_style);
			return action;
		});
	} ,
	retrieveMessageTemplate: async ( messageId ) => {
		return await table_message_template.get(messageId);
	} ,
	cleanDatabase: async () => {
		await new PouchDB('db/db001').destroy().catch(function( err ) {
			console.log | (err);
		});
		await new PouchDB('table_user_account').destroy().catch(function( err ) {
			console.log | (err);
		});
		await new PouchDB('table_message_template').destroy().
			catch(function( err ) {
				console.log | (err);
			});
		await new PouchDB('table_people').destroy().catch(function( err ) {
			console.log | (err);
		});
		await new PouchDB('table_automation').destroy().catch(function( err ) {
			console.log | (err);
		});
		await new PouchDB('table_queue').destroy().catch(function( err ) {
			console.log | (err);
		});
		setTimeout(() => {
			$('#waiting-modal .alert-warning').css('display' , 'none');
			$('#waiting-modal .alert-success').css('display' , 'block');
			setTimeout(() => {
				$('#waiting-modal').modal('toggle');
				window.location.reload();
			} , 5000);
		} , 5000);
	} ,
	retrieveAllAutomations: async () => {
		return table_automation.allDocs({ include_docs: true }).
			then(result => {return result.rows;});
	} ,
	retrieveAllMessageTemplates: async () => {
		return table_message_template.allDocs({ include_docs: true }).
			then(result => {return result.rows;});
	} ,
	saveCollection: async ( newDoc ) => {
		let oldDoc = await db.get(newDoc._id).catch(console.log);
		oldDoc
			? (oldDoc = Object.assign(oldDoc , newDoc), db.put(oldDoc))
			: db.post(newDoc);
	} ,
	docById: async ( id ) => {
		return await db.get(id).catch(console.log);
	} ,
	retrieveLoginInfo: async () => {
		return await db.get(constants.DOC_TYPE.USERINFO).catch(console.log);
	} ,
};

//TODO: remove when production
global.db = self;