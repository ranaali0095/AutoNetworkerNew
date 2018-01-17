let constants = {
	ONE_SECOND: 1000 ,
	ONE_MINUTE: 60000 ,
	TWO_MINUTE: 120000 ,
	HALF_MINUTE: 30000 ,
	TEN_SECOND: parseInt(10 * 1000) ,
	THIRTY_MINUTE: parseInt(30 * 60000) ,
	DOC_TYPE: {
		TASK: 'task' ,
		PROFILE: 'profile' ,
		SETTINGS: 'settings' ,
		USERINFO: 'userInfo' ,
		COOKIES: 'cookies'
	} ,
	TASK_STATUS: { PENDING: 'P' , STOP: 'S' , COMPLETED: 'C' } ,
	ACTION_NAME: {
		SEARCH_RESULTS: 'searchResults'
		,
		ADD_AUTOMATIONS: 'addAutomations'
		,
		ADD_BLACK_LIST: 'addToBlackList'
		,
		SEND_MESSAGE: 'sendMessage'
		,
		VISIT_PROFILE: 'visitProfile'
		,
		SEND_CONNECTION_REQUEST: 'sendConnectionRequest'
		,
		SEND_RECOMMENDATION_REQUEST: 'sendRecommendationRequest'
		,
		ADD_TAG: 'addTag'
		,
		TRANSFER_TO_A_NEW_CAMPAIGN: 'transferToANewCampaign'
		,
		ACCEPT_CONNECTION_REQUEST: 'acceptConnectionRequest'
		,
		WITHDRAW_CONNECTION_REQUEST: 'withdrawConnectionRequest'
		,
		CHECK_WHO_VISIT_MY_PROFILE: 'checkWhoVisitMyProfile'
		,
		CHECK_WHO_ACCEPTED_MY_CONNECTION_REQUEST: 'checkWhoAcceptedMyConnectionRequest'
		,
		CHECK_WHO_SENT_CONNECTION_REQUEST_TO_ME: 'checkWhoSentConnectionRequestToMe'
		,
		CHECK_WHO_SENT_MESSAGE_TO_ME: 'checkWhoSentMessageToMe'
		,
		CHECK_WHO_ENDORSED_ME: 'checkWhoEndorsedMe'
		,
		FIRST_LOGIN_RETRIEVE_PROFILES: 'firstLoginRetrieveProfiles'
	} ,
	URL: {
		BASE_URL: 'https://www.linkedin.com'
		,
		VISIT_PROFILE: 'https://www.linkedin.com/in/'
		,
		CHECK_WHO_VISIT_MY_PROFILE: 'https://www.linkedin.com/me/profile-views/'
		,
		CHECK_WHO_ACCEPTED_MY_CONNECTION_REQUEST: 'https://www.linkedin.com/mynetwork/invite-connect/connections/'
		,
		CHECK_WHO_SENT_CONNECTION_REQUEST_TO_ME: 'https://www.linkedin.com/mynetwork/invitation-manager/'
		,
		CHECK_WHO_SENT_MESSAGE_TO_ME: 'https://www.linkedin.com/messaging/compose/'
		,
		CHECK_WHO_ENDORSED_ME: 'https://www.linkedin.com/notifications/'
		,
		WITHDRAW_CONNECTION_REQUEST: 'https://www.linkedin.com/mynetwork/invitation-manager/sent/'
		,
		ACCEPT_CONNECTION_REQUEST: 'https://www.linkedin.com/mynetwork/invitation-manager/'
		,
		SALES_BASE_URL: 'https://www.linkedin.com/sales'
	} ,
	TRIGGER_STYLE: {
		EVERYONE: 'Everyone'
		, VISITED_MY_PROFILE: 'Visited my Profile'
		, ACCEPTED_MY_CONNECTION_REQUEST: 'Accepted my Connection Request'
		, ENDORSED_ME: 'Endorsed me'
		, SENT_A_CONNECTION_REQUEST_TO_ME: 'Sent a Connection Request to me'
		, SENT_A_MESSAGE_TO_ME: 'Sent a Message to me'
	} ,
	ACTION_STYLE: {
		VISIT_PROFILE: 'Visit Profile'
		, SEND_MESSAGE: 'Send Message'
		, SEND_CONNECTION_REQUEST: 'Send Connection Request'
		, SEND_RECOMMENDATION_REQUEST: 'Send Recommendation Request'
		, ADD_TAG: 'Add Tag'
		, TRANSFER_TO_A_NEW_CAMPAIGN: 'Transfer to a New Campaign'
		, ACCEPT_CONNECTION_REQUEST: 'Accept Connection Request'
		, WITHDRAW_CONNECTION_REQUEST: 'Withdraw Connection Request'
	} ,
	DELAYS: {
		MINUTES: 'Minute(s)'
		, HOURS: 'Hour(s)'
		, DAYS: 'Day(s)'
		, WEEKS: 'Week(s)'
		, MONTHS: 'Month(s)'
	} ,
	TIME_AGO: {
		MINUTE: 'm'
		, 'HOUR': 'h'
		, 'DAY': 'd'
		, 'WEEK': 'w'
		, 'MONTH': 'mo'
	} ,
	STATUS: {
		PENDINDG: 'Pending'
	}
};
module.exports = Object.freeze(constants);

global.constants = constants;
