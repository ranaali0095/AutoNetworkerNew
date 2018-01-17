let db = require('./helper-db.js')
,constants = require('./constants.js')
,settings = {}
var self = module != undefined ? module.exports = {
    initialize: async()=>{
        settings = await db.docById(constants.DOC_TYPE.SETTINGS)
        self.saveWhenOnChangeDefaultAutomation()
        self.loadAutomations()
    },
    loadAutomations: async ()=>{
        let automations = await db.retrieveAllAutomations()
        await automations.map(doc => {
            let automation = doc.doc
            $('#s5electDefaultAutomation').append(
                '<option value="' + automation._id + '">' + automation.automation_name + '</option>'
            );
        })
        $('#selectDefaultAutomation').val(settings && settings.default_automations ? settings.default_automations.id : -1)
    },
    saveWhenOnChangeDefaultAutomation:()=>{
        //Save default automation when change
        $('#selectDefaultAutomation').on('change',(e)=>{
            let $selectedItem = $(e.target).find('option:checked')
            db.saveCollection({_id:constants.DOC_TYPE.SETTINGS, default_automations:{name:$selectedItem.text(), id:$selectedItem.val()}})
        })
    }
} : null
