let webview = require('./helper-webview.js')
	, Nightmare = require('nightmare')
	, db = require('./helper-db.js')
	, people_table = require('../pages/database_people')
	, helper = require('./helper.js')
	, constants = require('./constants.js')
	, task = require('./helper-task.js')
	, nightmare = null;
require('nightmare-wait-for-url');

var self = module != undefined ? module.exports = {
	isloggedIn: false ,
	lastlogin: '' ,
	isInitialized: false ,
	initialize: async () => {
		nightmare == null || !self.isInitialized
			? (self.isInitialized = true, await self.nightmare())
			: null;
	} ,
	reload: async () => {
		self.lastlogin = userInfo.login;
		self.isInitialized = false;
		await new Promise(resolve => {
			nightmare.end().then(() => {
				debugger;
				self.isloggedIn = false;
				self.lastlogin = '';
				self.initialize();
				resolve();
			});
		});
	} ,
	nightmare: async () => {
		return new Promise(resolve => {
			nightmare = new Nightmare({
				electronPath: require('../../../../node_modules/electron') ,
				show: true ,
				executionTimeout: constants.TWO_MINUTE ,
				gotoTimeout: constants.TWO_MINUTE ,
				waitTimeout: constants.TWO_MINUTE // in ms
			});
			resolve();
		});
	} ,
	loadANCurrentPageToNightmare: async () => {
		let url = await webview.retrieveCurrentURL();
		return new Promise(resolve => {
			nightmare.goto(url).then(() => {
				resolve();
				console.log('load current url sucess');
			}).catch(( error ) => {
				console.log('load current url failed:' , error);
			});
		});
	} ,
	loadUrl: async ( url ) => {
		await self.loadCookies();
		return new Promise(resolve => {
			nightmare.goto(url).wait(5000).then(() => {
				resolve(true);
				console.log('load current url sucess');
			}).catch(( error ) => {
				console.log('load current url failed:' , error);
				resolve(false);
			});
		});
	} ,
	retrieveProfilesCurrentPage: async ( pendingTask ) => {
		let isProfilePage = pendingTask.url && pendingTask.url.indexOf('/in/') != -1
			, isSalesSearchPage = pendingTask.url &&
			pendingTask.url.indexOf('sales/search') != -1
			, isSalesProfilePage = pendingTask.url &&
			pendingTask.url.indexOf('sales/profile') != -1
			, profilesCurrentPage = null;
		isProfilePage
			? profilesCurrentPage = await self.retrieveProfileFromLinkedInProfilePage(
			pendingTask.url)
			: null;
		isSalesSearchPage
			? profilesCurrentPage = await self.retrieveProfileFromSalesSearchPage(
			pendingTask)
			: null;
		isSalesProfilePage
			? profilesCurrentPage = await self.retrieveProfileFromSalesProfilePage(
			pendingTask)
			: null;
		profilesCurrentPage == null
			? profilesCurrentPage = await self.retrieveProfileFromLinkedInSearchPage()
			: null;
		// console.log('Profiles current page ', profilesCurrentPage);
		return profilesCurrentPage;
	} ,
	retrieveProfileFromLinkedInProfilePage: async ( url ) => {
		console.error(url)
		let profileHtml = await nightmare.wait('section.pv-profile-section').
			evaluate(() => {
				// return $('section.pv-profile-section.pv-top-card-section').
				// 	prop('outerHTML');
				return $('div.core-rail').
					prop('outerHTML');
			}).
			catch(( error ) => {
				console.log('failed when checking if current page is profile page:' ,
					error);
			});

		let $html = $('<div/>').html(profileHtml)
			, profiles = [];

		if ( $html.find('.pv-top-card-section__name').length > 0 ) {
			let profile = {};
			profile.type = constants.DOC_TYPE.PROFILE;
			profile.people_blacklist = false;
			profile.people_tags = { p_tag: [] };
			profile.people_automations = { p_automation_name: [] };
			profile.people_common = 'Common';
			profile._id = url.split('/in/')[ 1 ].replace('/' , '');
			profile.people_full_name = $html.find('.pv-top-card-section__name').
				text().
				trim();
			profile.people_name_first = profile.people_full_name.split(' ')[ 0 ];
			profile.people_name_middle = '';
			profile.people_name_last = '';
			profile.currentPosition = $html.find('.pv-top-card-section__headline').
				text();
			profile.people_location = $html.find('.pv-top-card-section__location').
				text() || "";
			profile.link = url;
			let imgUrl = $html.find('.pv-top-card-section__image').
				attr('src')
				, defaultImage = '';
			profile.people_picture = imgUrl
				? await helper.toDataURL(imgUrl)
				: defaultImage;
			profile.people_connection = $html.find('.dist-value').text();
			profile.people_mutual_group = $html.find(
				'.pv-entity__summary-title').text();

			profile.people_mutual_connection = $html.find('h3.pv-entity__summary-title').text();
			profile.noSharedConnections = $html.find(
				'.pv-top-card-section__connections span:first').text();
			profile.people_title = $html.find('.pv-top-card-section__headline').
				text();
			console.log(profile.people_mutual_group);
			console.log(profile.noSharedConnections);
			profile.people_company = {
				people_company_name: $html.find('.pv-top-card-section__company').
					text().
					trim()
			};
			profiles.push(profile);

		}

		return profiles;

	} ,
	retrieveProfilesAllPages: async ( pendingTask = null ) => {
		let allProfiles = [];
		console.log(pendingTask);
		return new Promise(resolve => {
			(async function next ( index ) {
				console.log('from we retrieve All Pages');
				global.keepAlive();
				let profilesCurrentPage = await self.retrieveProfileFromLinkedInSearchPage();
				let dbTask = await db.db.get(pendingTask._id);
				dbTask.url = pendingTask.url + '&page=' + (index + 1);
				let newTask = await  db.db.post(dbTask);
				console.log(newTask);
				allProfiles = allProfiles.concat(profilesCurrentPage);
				await self.nextPage();
				if ( index == 10 ) {
					resolve(allProfiles);
				} else {
					// db.saveCollection(pendingTask);
					next(++index);
				}
			})(1);
		});
	} ,
	retrieveProfileFromLinkedInSearchPage: async () => {
		await self.loadProfilesLazy();
		let profilesHTML = await new Promise(resolve => {
			nightmare.evaluate(() => {
				console.log('inside evaluate');
				return $('.search-results-page').html();
			}).then(( result ) => {
				// console.log('after evaluate ' , result);
				resolve(result);
			}).catch(( error ) => {
				console.log('retrieveProfile failed:' , error);
			});
		});
		let $html = $('<div/>').html(profilesHTML)
			, profiles = []
			, $profileNode = $html.find('.search-entity');
		console.log('retrieveProfileFromLinkedInSearchPage');
		let peoples = await new Promise(resolve => {
			(async function next ( index ) {
				let $item = $($profileNode.get(index))
					, profile = {};
				profile.type = constants.DOC_TYPE.PROFILE;
				profile.people_blacklist = false;
				profile.people_tags = { p_tag: [] };
				profile.people_automations = { p_automation_name: [] };
				profile.people_common = 'Common';
				profile._id = $item.find('.search-result__result-link').
					attr('href').
					split('/')[ 2 ];
				profile.people_full_name = $item.find('.actor-name').text();
				profile.people_name_first = $item.find('.actor-name').
					text().
					split(' ')[ 0 ];
				profile.people_name_middle = '';
				profile.people_name_last = '';
				profile.currentPosition = $item.find('.subline-level-1').text();
				profile.people_location = $item.find('.subline-level-2').
					text().
					trim() || "";
				profile.link = $item.find('.search-result__result-link').attr('href');
				let url = $item.find('.search-result__image img:not(.ghost-person)').
					attr('src')
					, defaultImage = '';
				profile.people_picture = url
					? await helper.toDataURL(url)
					: defaultImage;
				profile.people_connection = $item.find('.dist-value').text();
				profile.noSharedConnections = $item.find(
					'.search-result__social-proof-count').text().trim().split(' ')[ 0 ];
				profile.people_title = $item.find('.subline-level-1').text();

				let $positionInfo = $item.find('.search-result__snippets')
					, info = $positionInfo.text().
					replace('Current:\n' , '').
					trim().
					split(' at ');
				profile.currentPosition = info[ 0 ];
				profile.people_company = { people_company_name: info[ 1 ] || "" };

				//console.log('index '+i+'\nid:'+id,'\nname:'+autorName, '\nposition:'+position, '\naddress:'+address, '\nlink:'+link, '\nimgLink:'+imgLink)
				// console.log(profile)
				if ( profile.link != '#' ) {
					// console.log('profile:'+autorName)
					profiles.push(profile);
				}
				if ( index == $profileNode.length - 1 ) {
					// console.log('returning profiles', profiles)
					resolve(profiles);
				} else {
					next(++index);
				}
			})(0);
		});
		console.log('before return peoples' , peoples);
		return peoples;
	} ,
	loadProfilesLazy: () => {
		return new Promise(resolve => {
			console.log('begin loadProfilesLazy');
			nightmare.wait('.search-results-container').evaluate(() => {
				$('html, body').
					animate(
						{ scrollTop: $('.search-results-container').get(0).clientWidth } ,
						'slow');
			}).wait(5000).then(() => {
				// console.log('end loadProfilesLazy');
				resolve(nightmare);
			}).catch(( error ) => {
				console.log('Search failed:' , error);
			});
		});
	} ,
	nextPage: () => {
		return new Promise(resolve => {
			nightmare.evaluate(() => {
				window.oldIndex = $('.page-list .active').text();
				$('button.next').click();
			}).wait(() => {
				return window.oldIndex != null && $('.page-list .active').text() !=
					window.oldIndex;
			}).then(() => {
				setTimeout(function() {
					resolve();
				} , Math.floor(Math.random() * 1000) + 1000);
			}).catch(( error ) => {
				console.log('Search failed:' , error);
			});
		});
	} ,
	sendMessageToProfile: async ( id , message ) => {
		let status = await new Promise(resolve => {
			nightmare.wait(3000).evaluate(async ( id , message ) => {
				window.msgSentSuccesfully = false;
				window.contactNoConnect = false;
				var isProfilePage = window.location.href.indexOf('/in/') != -1
					, allProfileLinks = $(
					'.search-result__info .search-result__result-link')
					, searchProfile = allProfileLinks.filter(
					( i , item ) => {return $(item).attr('href').indexOf(`${id}`) != -1;})
					, sendMessageButton = isProfilePage ? $(
					'.pv-s-profile-actions--message') : searchProfile.parents(
					'.search-entity').find('[data-control-name=message] button')
					, actionSendMessageExist = sendMessageButton.length > 0;
				let retorno = await new Promise(resolve => {
					actionSendMessageExist
						? beginSendMessage()
						: (window.contactNoConnect = true, resolve({
							msgSentSuccesfully: window.msgSentSuccesfully ,
							contactNoConnect: window.contactNoConnect
						}));

					function beginSendMessage () {
						console.log('begin send message');
						$('.msg-overlay-list-bubble').hide();
						setTimeout(() => {
							sendMessageButton.click();
							checkPopupMessageAppear();
						} , 2000);
					}

					function checkPopupMessageAppear () {
						let myInterval = setInterval(() => {
							console.log('check popup message appear');
							$('.msg-messaging-form').length > 0 ? (clearInterval(
								myInterval), sendMessage()) : null;
						} , 1000);
					}

					function sendMessage () {
						setTimeout(() => {
							console.log('begin sending message');
							$('textarea[name=message]').val(message).change();
							setTimeout(() => {
								$('.msg-messaging-form button[type=submit]').click();
							} , 500);
							setTimeout(() => {
								console.log('closing message popup');
								window.msgSentSuccesfully = true;
								$('[data-control-name=overlay\\.close_conversation_window]').
									click();
								resolve({
									msgSentSuccesfully: window.msgSentSuccesfully ,
									contactNoConnect: window.contactNoConnect
								});
							} , 3000);
						} , 1000);
					}
				});
				return retorno;
			} , id , message).wait(() => {
				return window.msgSentSuccesfully || window.contactNoConnect;
			}).evaluate(async () => {
				return {
					msgSentSuccesfully: window.msgSentSuccesfully ,
					contactNoConnect: window.contactNoConnect
				};
			}).then(( result ) => {
				// console.log('after evaluate ' , result)
				resolve(result.msgSentSuccesfully ? 'success' : (result.contactNoConnect
					? 'profile is not connect with you'
					: 'error'));
			}).catch(( error ) => {
				console.log('retrieveProfile failed:' , error);
				resolve('error');
			});
		});
		return status;
	} ,
	sendConnectionRequestToProfile: async ( id , message ) => {
		let status = await new Promise(resolve => {
			nightmare.evaluate(async ( id , message ) => {
				window.actionSuccess = false;
				window.actionNotAvalaible = false;
				var isProfilePage = window.location.href.indexOf('/in/') != -1
					, allProfileLinks = $(
					'.search-result__info .search-result__result-link')
					, searchProfile = allProfileLinks.filter(
					( i , item ) => {return $(item).attr('href').indexOf(`${id}`) != -1;})
					, actionButton = isProfilePage
					? $('.pv-s-profile-actions--connect')
					: searchProfile.parents('.search-entity').
						find('button:contains(Connect)')
					, actionConnectExist = actionButton.length > 0;
				let retorno = await new Promise(resolve => {
					actionConnectExist
						? (actionButton.click(), checkPopupSendInviteAppear())
						: (window.actionNotAvalaible = true, resolve({
							actionSuccess: window.actionSuccess ,
							actionNotAvalaible: window.actionNotAvalaible
						}));

					function checkPopupSendInviteAppear () {
						let myInterval = setInterval(() => {
							$('.visible.send-invite').length > 0 ? (clearInterval(
								myInterval), sendInvite()) : null;
						} , 2000);
					}

					function sendInvite () {
						setTimeout(() => {
							//if not exists message, send invite immediately
							message ? sendMessage() : makeSendInviteAction();

							function sendMessage () {
								$('.send-invite__actions button:contains(Add a note)').click();
								let myInterval = setInterval(() => {
									$('#custom-message').length > 0 ? (clearInterval(
										myInterval), setTimeout(() => {
										$('#custom-message').val(message).change();
										makeSendInviteAction();
									} , 3000)) : null;
								} , 2000);
							}

							function makeSendInviteAction () {
								setTimeout(() => {
									$('.send-invite__actions button:eq(1)').click();
									let myInterval = setInterval(() => {
										window.actionSuccess = true;
										$('.mn-heathrow-toast__confirmation-text, .mn-invite-alert__content').length >
										0 ? clearInterval(myInterval) : null;
										resolve({
											actionSuccess: window.actionSuccess ,
											actionNotAvalaible: window.actionNotAvalaible
										});
									} , 3000);
								} , 3000);
							}
						} , 1000);
						//TODO: When PRODUCTION retrieving delay from AN config
					}
				});
				return retorno;
			} , id , message).wait(() => {
				return window.actionSuccess || window.actionNotAvalaible;
			}).evaluate(async () => {
				return {
					actionSuccess: window.actionSuccess ,
					actionNotAvalaible: window.actionNotAvalaible
				};
			}).then(( result ) => {
				// console.log('after evaluate ' , result)
				resolve(result.actionSuccess ? 'success' : (result.actionNotAvalaible
					? 'profile is not connect with you'
					: 'error'));
			}).catch(( error ) => {
				console.log('retrieveProfile failed:' , error);
				resolve('error');
			});
		});
		return status;
	} ,
	profileViews: async () => {
		let profiles = await nightmare.wait(
			'section.me-wvmp-overview__viewers-list').evaluate(() => {
			return $('section.me-wvmp-overview__viewers-list').html();
		}).then(( profiles ) => {
			return profiles;
		}).catch(( error ) => {
			console.log('retrieveProfile failed:' , error);
			return 'error';
		});
		let $html = $('<div/>').html(profiles);
		$profiles = $html.find(
			'article[data-control-name=profileview_single]:not(.me-wvmp-profile-view-card--anon)');
		profiles = await $profiles.map(( i , element ) => {
			let $profile = $(element)
				, id = $profile.find('a[data-control-name=profileview_single]').
				attr('href').
				split('/in/')[ 1 ].replace('/' , '')
				, distance = $profile.find('.distance-badge').text()
				, status = $profile.find(
				'.me-wvmp-card-insight__cta.button-secondary-muted span:first').text()
				, readyToConnect = $profile.find(
				'button[data-control-name=connect_CTA]').length > 0;
			return {
				id: id ,
				distance: distance ,
				readyToConnect: readyToConnect ,
				status: status
			};
		});
		return profiles;
	} ,
	removeConnection: async ( id ) => {
		return await nightmare.wait('.pv-top-card-overflow__trigger').
			click('.pv-top-card-overflow__trigger').
			wait('.pv-top-card-overflow__options').
			click('.pv-top-card-overflow__options .action.disconnect button').
			then(() => {

			}).
			catch(( error ) => {
				console.log('retrieveProfile failed:' , error);
			});
	} ,
	isProfilePage: async () => {
		return await nightmare.evaluate(() => {
			return window.location.href.indexOf('/in/') != -1;
		}).catch(( error ) => {
			console.log('failed when checking if current page is profile page:' ,
				error);
		});
	} ,
	withdrawConnectionRequest: async ( profileId ) => {
		await nightmare.evaluate(( profileId ) => {
			withdrawConnectionRequest = false;
			var $foundProfile = $(
				'.mn-person-card--selectable a[data-control-name=profile].mn-person-info__picture').
				filter(( i , item ) => {
					return $(item).attr('href').indexOf(profileId) != -1;
				});
			// .parents('.mn-person-card--selectable')
			// .find('[data-control-name=withdraw_single]').click()
			console.log('found profile count:' + $foundProfile.length);
			$foundProfile.length > 0 ? $foundProfile.parents(
				'.mn-person-card--selectable').
				find('[data-control-name=withdraw_single]').
				click() : withdrawConnectionRequest = true;
			console.log(withdrawConnectionRequest);

		} , profileId).wait(() => {
			return $('.artdeco-toast-message').length > 0 ||
				withdrawConnectionRequest;
		}).catch(( error ) => {
			console.log('failed when checking if current page is profile page:' ,
				error);
		});
		return profileId;
	} ,
	acceptConnectionRequest: async ( profileId ) => {
		await nightmare.evaluate(( profileId ) => {
			acceptConnectionRequest = false;
			var $foundProfile = $(
				'.mn-person-card--selectable a[data-control-name=profile].mn-person-info__picture').
				filter(( i , item ) => {
					return $(item).attr('href').indexOf(profileId) != -1;
				});
			// .parents('.mn-person-card--selectable')
			// .find('[data-control-name=accept]').click()
			$foundProfile.length > 0 ? $foundProfile.parents(
				'.mn-person-card--selectable').
				find('[data-control-name=accept]').
				click() : acceptConnectionRequest = true;
			console.log(acceptConnectionRequest);
		} , profileId).wait(() => {
			return $('.artdeco-toast-message').length > 0 || acceptConnectionRequest;
		}).catch(( error ) => {
			console.log('failed when accept connection request:' , error);
		});
		return profileId;
	} ,
	profileAcceptedConnections: async () => {
		let profiles = await nightmare.wait('.mn-connections__list').
			evaluate(() => {
				return $('.mn-connections__list').html();
			}).
			catch(( error ) => {
				console.log('retrieveProfile failed:' , error);
				return 'error';
			});
		let $html = $('<div/>').html(profiles);
		$profiles = $html.find('.mn-person-card.connection-card').slice(0 , 5);
		profiles = $profiles.length == 0 ? [] : await $profiles.map(
			( i , element ) => {
				let $profile = $(element)
					, id = $profile.find('a.mn-person-info__picture').
					attr('href').
					split('/in/')[ 1 ].replace('/' , '');
				return { id: id };
			});
		return profiles;
	} ,
	profileSentConnectionRequestToMe: async () => {
		let profiles = await nightmare.wait(
			'.mn-invitation-list, .mn-invitation-manager__no-invites').
			evaluate(() => {
				return $('.mn-invitation-list').html();
			}).
			catch(( error ) => {
				console.log('retrieveProfile failed:' , error);
				return 'error';
			});
		let $html = $('<div/>').html(profiles);
		$profiles = $html.find('.mn-invitation-card__invite-details-container').
			slice(0 , 5);
		profiles = $profiles.length == 0 ? [] : await $profiles.map(
			( i , element ) => {
				let $profile = $(element)
					, id = $profile.find('a[data-control-name=profile]').
					attr('href').
					split('/in/')[ 1 ].replace('/' , '');
				return { id: id };
			});
		return profiles;
	} ,
	threadPeopleSentMessageToMe: async () => {
		let threads = await nightmare.wait(
			'.msg-conversations-container__conversations-list').evaluate(() => {
			return $(
				'.msg-conversations-container__conversations-list li:not(li:contains(Linked)):has(.msg-conversation-card__unread-count)').
				prop('outerHTML');
		}).then(( threads ) => {
			return threads;
		}).catch(( error ) => {
			console.log('retrieveProfile failed:' , error);
			return 'error';
		});
		let $html = $('<div/>').html(threads);
		$threads = $html.find('[data-control-name=view_message]');
		threads = await $threads.map(( i , element ) => {
			let $thread = $(element)
				, id = $thread.attr('href');
			return { id: id };
		});
		return threads;
	} ,
	retrieveProfileFromMessaging: async ( threadId ) => {
		return await nightmare.goto(constants.URL.BASE_URL + threadId).
			wait('textarea[name=message]').
			evaluate(() => {
				return $('[data-control-name=topcard]').
					attr('href').
					replace('/in/' , '');
			});
	} ,
	profileEndorsedMe: async ( threadId ) => {
		return await nightmare.evaluate(() => {
			var $notification = $(
				'article.nt-card--unread:has(.nt-card__text--align-start:contains(endorsed))')
				, profileId = $notification.length > 0 ? $notification.find('a').
				attr('href').
				replace('/in/' , '') : '';
			return profileId;
		});
	} ,
	loadCookies: async () => {
		let cookies = await db.docById(constants.DOC_TYPE.COOKIES);
		cookies = cookies ? JSON.parse(cookies.value) : [];
		for (var index = 0; index < cookies.length; index++) {
			var cookie = cookies[ index ];
			nightmare.cookies.set({
				url: constants.URL.BASE_URL ,
				name: cookie.name ,
				value: cookie.value
			});
		}
		return cookies;
	} ,
	retrieveAllConnectionsWhenFirstLogin: async () => {
		await self.loadCookies();
		let totalConnections = await nightmare.goto(
			constants.URL.CHECK_WHO_ACCEPTED_MY_CONNECTION_REQUEST).
			wait('.connections-container').
			evaluate(() => {
				return $('.connections-container h2').text().trim().split(' ')[ 0 ];
			});

		for (let index = 0; index < totalConnections; index += 5) {
			global.keepAlive();
			await nightmare.evaluate(( index ) => {
				window.lazyStop = false;
				let $profile = $(
					`.connections-container li.mn-person-card:eq(${index})`)
					, totalConnections = $('.connections-container h2').
					text().
					trim().
					split(' ')[ 0 ];
				$profile.length == 0 ? $profile = $(
					`.connections-container li.mn-person-card:last`) : null;
				$('body').
					animate({ scrollTop: $profile.offset().top } , 'slow' , () => {
						window.lazyStop = true;
					});
			} , index).wait(() => {
				return window.lazyStop;
			});
		}

		let profilesHtml = await nightmare.evaluate(() => {
			return $('.connections-container').html();
		});
		global.keepAlive();
		let $html = $('<div/>').html(profilesHtml);
		$profiles = $html.find('.mn-person-card.connection-card');
		let profiles = $profiles.length == 0 ? [] : await $profiles.map(
			async ( i , element ) => {
				console.log(element);
				let $profile = $(element)
					, id = $profile.find('a.mn-person-info__picture').
					attr('href').
					split('/in/')[ 1 ].replace('/' , '')
					, fields = null
					, automation_name = undefined
					, profileUrl = undefined
					, url = undefined
					, retrieveAllPages = false
					, executionDatetime = undefined
					, profile = undefined;

				profileUrl = constants.URL.VISIT_PROFILE + id;
				await task.addNewTasks('First Login/Retrieve this Profile' ,
					constants.ACTION_NAME.VISIT_PROFILE , retrieveAllPages , fields ,
					constants.TRIGGER_STYLE.VISIT_PROFILE , executionDatetime ,
					profileUrl , url , profile);

				return { id: id };
			});

		console.log(profiles);
	} ,
	scrapAllConnectionsOnFirstLogin: async () => {
		await self.loadCookies();
		let totalConnections = await nightmare.goto(
			constants.URL.CHECK_WHO_ACCEPTED_MY_CONNECTION_REQUEST).wait(3000).
			wait('.connections-container').
			evaluate(() => {
				return $('.connections-container h2').text().trim().split(' ')[ 0 ];
			});

		console.log(totalConnections);
		totalConnections = totalConnections.replace(/,/g , "");
		console.log(totalConnections);
		totalConnections = parseInt(totalConnections);
		console.log(totalConnections);

		for (let index = 0; index < totalConnections + 400; index += 20) {
			global.keepAlive();
			await nightmare.evaluate(( index ) => {
				window.lazyStop = false;
				let $profile = $(
					`.connections-container li.mn-person-card:eq(${index})`)
					, totalConnections = $('.connections-container h2').
					text().
					trim().
					split(' ')[ 0 ];
				$profile.length == 0 ? $profile = $(
					`.connections-container li.mn-person-card:last`) : null;
				$('body').
					animate({ scrollTop: $profile.offset().top } , 'slow' , () => {
						window.lazyStop = true;
					});
			} , index).wait(() => {
				return window.lazyStop;
			});
		}

		let profilesHtml = await nightmare.evaluate(() => {
			return $('.connections-container').html();
		});
		global.keepAlive();
		let $html = $('<div/>').html(profilesHtml);
		let peoples = [];
		let $profiles = $html.find('.mn-person-card.connection-card');
		let profiles = $profiles.length == 0 ? [] : await $profiles.map(
			async ( i , element ) => {
				let $profile = $(element);
				console.log($profile.find('span.mn-person-info__name').
					text());

				console.log($profile.find('span.mn-person-info__name').
					text());
				let profile1 = {};
				profile1.type = constants.DOC_TYPE.PROFILE;
				profile1.people_blacklist = false;
				profile1.people_tags = { p_tag: [] };
				profile1.people_automations = { p_automation_name: [] };
				profile1.people_common = 'Common';
				profile1._id = $profile.find('a.mn-person-info__picture').
					attr('href').
					split('/in/')[ 1 ].replace('/' , '');
				profile1.people_full_name = $profile.find('span.mn-person-info__name').
					text();
				profile1.people_name_first = $profile.find('span.mn-person-info__name').
					text().
					split(' ')[ 0 ];
				profile1.people_name_middle = '';
				profile1.people_name_last = '';
				profile1.currentPosition = '';
				profile1.people_location = '';
				profile1.link = constants.URL.VISIT_PROFILE + profile1._id;
				let url = $profile.find('.lazy-image').
					attr('src')
					, defaultImage = '';
				profile1.people_picture = url
					? await helper.toDataURL(url)
					: defaultImage;
				profile1.people_connection = '1st';
				profile1.noSharedConnections = '';
				profile1.people_mutual_group ='';
				profile1.people_mutual_connection = '';
				profile1.noSharedConnections = '';
				profile1.people_title = $profile.find(
					'span.mn-person-info__occupation').text();

				let $positionInfo = $profile.find('span.mn-person-info__occupation')
					, info = $positionInfo.text().
					replace('Current:\n' , '').
					trim().
					split(' at ');
				profile1.currentPosition = info[ 0 ];
				profile1.people_company = { people_company_name: "" };

				$('#login-scrap-msg').text(`<strong>${i + 1}</strong>`);
				await  db.addPeople(profile1);
			});

		console.log('scrap profiles');

		return profiles;
	} ,
	retrieveProfileFromSalesSearchPage: async ( pendingTask ) => {
		console.log('inside retrieveProfileFromSalesSearchPage');

		let total = await nightmare.wait('#results-list').evaluate(() => {
			return $('#results-list li').length;
		});

		for (let index = 0; index < total; index += 3) {
			global.keepAlive();
			await nightmare.evaluate(( index ) => {
				window.lazyStop = false;
				let $profile = $(`#results-list li:eq(${index})`)
					, total = $('#results-list li').length;
				$profile.length == 0 ? $profile = $(`#results-list li:last`) : null;
				$('body').
					animate({ scrollTop: $profile.offset().top } , 'slow' , () => {
						window.lazyStop = true;
					});
			} , index).wait(() => {
				return window.lazyStop;
			});
		}
		let profilesHtml = await nightmare.evaluate(() => {
			return $('#results-list').html();
		});

		global.keepAlive();

		let $html = $('<div/>').html(profilesHtml);
		$profiles = $html.find('.result:not(:contains(LinkedIn Member))');
		let profiles = [];

		return await new Promise(resolve => {
			(async function next ( index ) {
				let $profile = $($profiles[ index ])
					, profileLink = $profile.find('.name-container').
					find('a.profile-link').
					attr('href');
				// ,profileName = $profile.find('.name-container').text()
				// ,companyLink = $profile.find('.details-container').find('a.company-link').attr('href')
				// ,companyName = $profile.find('.details-container a').text()
				// ,charge = $profile.find('.info-value:first').text()
				// ,antiquity = $profile.find('.info-value:eq(1)').text()
				// ,country = $profile.find('.info-value:last').text()
				// ,degree = $profile.find('.degree-icon').text()

				// console.log('profile name:'+profileName)
				// console.log('profile charge:'+charge)
				// console.log('profile antiquity:'+antiquity)
				// console.log('profile country:'+country)
				// console.log('profile degree:'+degree)
				// console.log('profile link:'+profileLink)
				// console.log('company name:'+companyName)
				// console.log('company link:'+companyLink)

				let fields = pendingTask.fields
					, automation_name = undefined
					, profileUrl = undefined
					, url = undefined
					, retrieveAllPages = false
					, executionDatetime = undefined
					, profile = undefined;

				url = constants.URL.BASE_URL + profileLink;
				await task.addNewTasks('Retrieve Profile from sales profile page' ,
					pendingTask.actionName , retrieveAllPages , fields ,
					constants.TRIGGER_STYLE.VISIT_PROFILE , executionDatetime ,
					profileUrl , url , profile);

				if ( index == $profiles.length - 1 ) {
					resolve(profiles);
				} else {
					setTimeout(() => {
						next(++index);
					} , 1000);
				}
			})(0);
		});
	} ,
	retrieveProfileFromSalesProfilePage: async ( pendingTask ) => {
		console.log('inside retrieveProfileFromSalesProfilePage');
		let profileLink = await nightmare.goto(pendingTask.url).
			wait('.linkedin-logo').
			evaluate(() => {
				var profileLink = $('.linkedin-logo').
					next().
					find('a').
					attr('href').
					split('/').
					slice(-4);
				profileLink = profileLink[ 0 ] + '-' + profileLink.slice(-1) +
					profileLink[ 2 ].padStart(3 , '0') + profileLink[ 1 ];
				return profileLink;
			});
		let url = constants.URL.BASE_URL + '/in/' + profileLink;
		await nightmare.goto(url);
		let profile = await self.retrieveProfileFromLinkedInProfilePage(url);
		return profile;
	} ,

	//login user on save saving profile
	loginUserUsingDBCredentials: async ( user ) => {
		return await nightmare.goto(constants.URL.BASE_URL).
			type('input[id="login-email"]' , user.user_email).
			// Substitute with your username.
			type('input[id="login-password"]' , user.account_password).
			// Substitute with your password
			click('input[id="login-submit"]').
			wait(3000).exists('#ember1673').wait(1000).cookies.get().then(result => {
				if ( result[ 0 ].name === "JSESSIONID" ) {
					return Promise.resolve({ status: false });
				} else {
					console.log(result + 'Result is positive');
					let docCookies = {};
					docCookies._id = constants.DOC_TYPE.COOKIES;
					docCookies.value = JSON.stringify(result);
					db.saveCollection(docCookies);
					db.saveCollection(user);
					return Promise.resolve({ status: true });
				}
			});
	} ,

	closeNightmare: async () => {
		return await nightmare.end();
	} ,

	okStillExists: async ( nightmare ) => {
		return nightmare.wait(3000) //wait 3 seconds to be fairly certain the page loaded
			//again this will return a boolean so we can check if the button exists
			.then(function( result ) {
				if ( result ) {
					console.log('OK Button still exists');
					nightmare.click('[id=OK_Button]'); //click it again so we can keep moving through the confirmations
					return okStillExists(nightmare); //and finally run the function again since it's still here
				} else {
					console.log('OK Button DOES NOT exists');
					return false;
				}

			});
	} ,

	scrapProfile: async () => {
		await  self.loadCookies();
		return await nightmare.goto(constants.URL.BASE_URL).
			wait(5000).
			evaluate(() => {
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
				return Promise.resolve({
					userName: userName ,
					userAvatar: userAvatar
				});
			});
	} ,

	retriveProfileOfConnection: async ( url ) => {
		await self.loadCookies();
		let profileHtml = await nightmare.goto(url).
			wait('section.pv-profile-section').
			evaluate(() => {
				return $('section.pv-profile-section.pv-top-card-section').
					prop('outerHTML');
			}).
			catch(( error ) => {
				console.log('failed when checking if current page is profile page:' ,
					error);
			});

		let $html = $('<div/>').html(profileHtml)
			, profiles = [];

		if ( $html.find('.pv-top-card-section__name').length > 0 ) {

			let profile = {};
			profile.type = constants.DOC_TYPE.PROFILE;
			profile.people_blacklist = false;
			profile.people_tags = { p_tag: [] };
			profile.people_automations = { p_automation_name: [] };
			profile.people_common = 'Common';
			profile._id = url.split('/in/')[ 1 ].replace('/' , '');
			profile.people_full_name = $html.find('.pv-top-card-section__name').
				text().
				trim();
			profile.people_name_first = profile.people_full_name.split(' ')[ 0 ];
			profile.people_name_middle = '';
			profile.people_name_last = '';
			profile.currentPosition = $html.find('.pv-top-card-section__headline').
				text();
			profile.people_location = $html.find('.pv-top-card-section__location').
				text();
			profile.people_mutual_group = $html.find(
				'.pv-entity__summary-title').text();
			profile.people_mutual_connection = $html.find(
				'.pv-entity__summary-title').text();
			profile.link = url;
			let imgUrl = $html.find('.pv-top-card-section__image').
				attr('src')
				, defaultImage = '';
			profile.people_picture = imgUrl
				? await helper.toDataURL(imgUrl)
				: defaultImage;
			profile.people_connection = "1st";
			profile.noSharedConnections = $html.find(
				'.pv-top-card-section__connections span:first').text();
			profile.people_title = $html.find('.pv-top-card-section__headline').
				text();
			profile.people_company = {
				people_company_name: $html.find('.pv-top-card-section__company').
					text().
					trim()
			};
			// console.log($html.find('.dist-value')[ 0 ].html());
			profiles.push(profile);
			let profileDoc = await table_people.get(profile._id);
			profile._rev = profileDoc._rev;
			await table_people.put(profile);

		}

		return profiles;

	}
} : null;

//TODO: remove when production
global.helper_nightmare = self;