let helper = require('./helper.js')
	, db = require('./helper-db.js')
	, constants = require('./constants.js')
	, task = require('./helper-task.js');

var self = module != undefined ? module.exports = {
	webview: null ,
	initialize: () => {
		self.webview = $('#sales-webview');
		// self.webview.attr('src' , constants.URL.SALES_BASE_URL);

		self.webview.on('did-stop-loading' , self.webviewDidStopLoadingHandler);
		$('#showAutomationProfileInputModal').
			on('click' , self.showAutomationModal);
		$('#showTagProfileInputModal').on('click' , self.showTagModal);
		$('#showMessageProfileEditModal').on('click' , self.showMessageModal);

		let interval = setInterval(() => {
			$('#automationsInput').select2 ? (clearInterval(
				interval), self.initializeActions()) : null;
		} , 50);

		$('#automationsBulkAction').on('click' , self.automationsBulkActionHandler);
		$('#tagsBulkAction').on('click' , self.tagsBulkActionHandler);
		$('#btnGetProfiles').on('click' , self.getProfilesHandler);
		$('#btnAddToBlackList').on('click' , self.addToBlackListHandler);
		$('#messageBulkAction').on('click' , self.messageBulkActionHandler);
	} ,
	webviewDidStopLoadingHandler: () => {
		console.log('inside webviewDidStopLoadingHandler');
		helper.retrieveAndSaveCookies(constants.URL.SALES_BASE_URL);
		self.enableActions();
		// self.redirectSalesPageAfterLogin();
	} ,
	enableActions: () => {
		let url = self.webview.get(0).getURL()
			,
			showActions = url.indexOf('profile') != -1 || url.indexOf('search') != -1;

		$('#actions').hide();
		$('#notActions').hide();

		showActions ? $('#actions').show() : $('#notActions').show();
	} ,
	redirectSalesPageAfterLogin: () => {

		setTimeout(function() {

			let url = self.webview.get(0).getURL()
				, isSalesPage = url.indexOf('sales') != -1;

			isSalesPage ? null : self.webview.attr('src' ,
				constants.URL.SALES_BASE_URL);
		} , 2000);
	} ,
	showAutomationModal: ( e ) => {
		$('#modal-input-automations').modal('show');
	} ,
	showTagModal: ( e ) => {
		$('#modal-input-tags').modal('show');
	} ,
	showMessageModal: ( e ) => {
		$('#modal-input-messages').modal('show');
	} ,
	initializeActions: async () => {
		let automations = await db.retrieveAllAutomations();
		await automations.map(doc => {
			let automation = doc.doc;
			$('#automationsSelect').append(
				'<option value="' + automation._id + '">' + automation.automation_name +
				'</option>'
			);
		});
		let messageTemplates = await db.retrieveAllMessageTemplates();
		await messageTemplates.map(doc => {
			let messageTemplate = doc.doc;
			let option = document.createElement('option');
			option.value = messageTemplate._id;
			option.text = messageTemplate._id;
			option.setAttribute("data-template" , messageTemplate.message_text);
			$('#messageSelect').append(option);
		});

		$('#automationsSelect').select2();
		$('#tagsSelect').select2({
			tags: true ,
			tokenSeparators: [ ',' ]
		});

		$('#messageSelect').select2({
			minimumResultsForSearch: -1
		});

		$('#messageSelect').on('change' , ( e ) => {
			let templateValue = $(e.target).find('option:checked').data('template');
			$('#messageText').val(templateValue);
		});
		$('#messageTemplateType').on('change' , ( e ) => {
			let templateType = $(e.target).find('option:checked').val();
			templateType == 'selectFromTemplate' ? $('#messageSelect').
				next(".select2-container").
				show() : $('#messageSelect').next(".select2-container").hide();
		});

		messageTemplates.length > 0 ? $('#messageSelect').change() : null;
	} ,
	automationsBulkActionHandler: ( e ) => {
		console.log('inside automationsBulkActionHandler');
		let $popup = $('#modal-input-automations');
		let selectedValues = $popup.find('select').val();
		if ( selectedValues.length > 0 ) {
			let allPagesChecked = helper.checkGetAllPagesChecked($(e.target))
				, fields = { people_automations: { p_automation_name: [] } };
			fields.people_automations.p_automation_name = fields.people_automations.p_automation_name.concat(
				selectedValues);
			task.addNewTasks('Automation' , constants.ACTION_NAME.ADD_AUTOMATIONS ,
				allPagesChecked , fields);
			$popup.modal('hide');
		} else {
			helper.showMessage('Add at least one automation' , '.form-group');
		}
	} ,
	tagsBulkActionHandler: ( e ) => {
		console.log('inside tagsBulkActionHandler');
		let $popup = $('#modal-input-tags');
		let selectedValues = $popup.find('select').val();
		if ( selectedValues.length > 0 ) {
			let allPagesChecked = helper.checkGetAllPagesChecked($(e.target));
			fields = { people_tags: { p_tag: [] } };
			fields.people_tags.p_tag = fields.people_tags.p_tag.concat(
				selectedValues);
			task.addNewTasks('Add Tags' , constants.ACTION_NAME.ADD_TAG ,
				allPagesChecked , fields);
			$popup.modal('hide');
		} else {
			helper.showMessage('Add at least one tag' , '.form-group');
		}
	} ,
	getProfilesHandler: ( e ) => {
		let allPagesChecked = helper.checkGetAllPagesChecked($(e.target));
		task.addNewTasks('Search Results' , constants.ACTION_NAME.SEARCH_RESULTS ,
			allPagesChecked);
	} ,
	addToBlackListHandler: ( e ) => {
		let allPagesChecked = helper.checkGetAllPagesChecked($(e.target));
		let fields = { people_blacklist: true };
		task.addNewTasks('Add to BalckList' , constants.ACTION_NAME.ADD_BLACK_LIST ,
			allPagesChecked , fields);
	} ,
	messageBulkActionHandler: ( e ) => {
		let $popup = $('#modal-input-messages');
		let selectedValues = $popup.find('select').val();
		let allPagesChecked = helper.checkGetAllPagesChecked($(e.target));
		if ( selectedValues ) {
			let messageFromTemplate = $popup.find('select:first').val() ==
				'selectFromTemplate';
			let fields = {};
			fields.message = messageFromTemplate ? $popup.find(
				'select:eq(1) option:checked').data('template') : $popup.find(
				'textarea').val().trim();
			if ( fields.message ) {
				task.addNewTasks('Send Message' , constants.ACTION_NAME.SEND_MESSAGE ,
					allPagesChecked , fields);
				$popup.modal('hide');
			} else {
				helper.showMessage(
					'Add a message from the template or write a custom message' ,
					'.modal-body');
			}
		}
	}
} : null;