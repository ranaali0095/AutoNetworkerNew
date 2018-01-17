let constants = require('./constants.js')
,task = require('./helper-task.js')

var self = module ? module.exports = {
    initialize:()=>{
        self.monitor()
        self.checkIsAlive()
    },
    monitor: async()=>{
        self.keepAlive()
        let retrieveAllPages = false
        ,fields = undefined
        ,automation_name = undefined
        ,profileUrl = undefined
        task.addNewTasks('Trigger Who Visit My Profile'
                          ,constants.ACTION_NAME.CHECK_WHO_VISIT_MY_PROFILE
                          ,retrieveAllPages
                          ,fields
                          ,automation_name
                          ,task.calculateExecutionDatetime(8 + ' ' +constants.DELAYS.MINUTES)
                          ,profileUrl
                          ,constants.URL.CHECK_WHO_VISIT_MY_PROFILE)

        task.addNewTasks('Trigger Who Accepted my Connection Request'
                          ,constants.ACTION_NAME.CHECK_WHO_ACCEPTED_MY_CONNECTION_REQUEST
                          ,retrieveAllPages
                          ,fields
                          ,automation_name
                          ,task.calculateExecutionDatetime(9 + ' ' +constants.DELAYS.MINUTES)
                          ,profileUrl
                          ,constants.URL.CHECK_WHO_ACCEPTED_MY_CONNECTION_REQUEST)

        task.addNewTasks('Trigger Who Endorsed Me'
                          ,constants.ACTION_NAME.CHECK_WHO_ENDORSED_ME
                          ,retrieveAllPages
                          ,fields
                          ,automation_name
                          ,task.calculateExecutionDatetime(10 + ' ' +constants.DELAYS.MINUTES)
                          ,profileUrl
                          ,constants.URL.CHECK_WHO_ENDORSED_ME)

        task.addNewTasks('Trigger Who Sent A Connection Request To Me'
                          ,constants.ACTION_NAME.CHECK_WHO_SENT_CONNECTION_REQUEST_TO_ME
                          ,retrieveAllPages
                          ,fields
                          ,automation_name
                          ,task.calculateExecutionDatetime(11 + ' ' +constants.DELAYS.MINUTES)
                          ,profileUrl
                          ,constants.URL.CHECK_WHO_SENT_CONNECTION_REQUEST_TO_ME)

        task.addNewTasks('Trigger Who Sent A Message To Me'
                          ,constants.ACTION_NAME.CHECK_WHO_SENT_MESSAGE_TO_ME
                          ,retrieveAllPages
                          ,fields
                          ,automation_name
                          ,task.calculateExecutionDatetime(12 + ' ' +constants.DELAYS.MINUTES)
                          ,profileUrl
                          ,constants.URL.CHECK_WHO_SENT_MESSAGE_TO_ME)

        //task.addNewTasks('Add Tags', constants.ACTION_NAME.ADD_TAG, allPagesChecked, fields)
        //self.addNewTasks('Automation', functionName, false, fields, automation_name, executionDatetime, profileUrl, url)
    },
    checkIsAlive:()=>{
        let intervalTimeout = constants.THIRTY_MINUTE
        setInterval(()=>{
            let now = new Date()                
            if (self.lastRunTime >= intervalTimeout) {
                self.monitor()
                console.log("monitor run after "+intervalTimeout+" milliseconds.");
            }
        },intervalTimeout)
    },
    keepAlive:()=>{
        self.lastRunTime = new Date()
    },
    lastRunTime: new Date(),
} : null