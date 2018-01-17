//Database document define
let table_user_account = new PouchDB('table_user_account');
var table_message_template = new PouchDB('table_message_template');
var table_people = new PouchDB('table_people');
var table_automation = new PouchDB('table_automation');
var table_queue = new PouchDB('table_queue');
let db = new PouchDB('db/db001');
var automationListVal = [];

var trigger_style = ['Everyone', 'Visited my Profile', 'Accepted my Connection Request', 'Endorsed me', 'Sent a Connection Request to me', 'Sent a Message to me'];
var action_style = ['Visit Profile', 'Send Message', 'Send Connection Request', 'Send Recommendation Request', 'Add Tag', 'Transfer to a New Campaign', 'Accept Connection Request', 'Withdraw Connection Request'];
var action_title = ['visitProfile', 'sendMessage', 'sendConnectionRequest', 'sendRecomRequest', 'addTag', 'transferCampaign', 'acceptConnectionRequest', 'withdrawConnectionRequest'];

//add item automationListVal
table_automation.allDocs({
    include_docs: true
}).then(function(response) {
    for (var i = 0; i < response.rows.length; i++) {
        automationListVal.push(response.rows[i].doc.automation_name);
    }
    console.log(automationListVal);
}).catch(function(err1) {
    console.log(err1);
});

function validateInputBox(inputDom) {
    if (inputDom.value) {
        return true;
    } else {
        return false;
    }
}

Array.prototype.unique = function() {
    var a = this.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
};

var getArrayFromSelect = function(selectDom) {
    var result = [];
    var options = selectDom.options;
    var opt;

    for (var i = 0, iLen = options.length; i < iLen; i++) {
        opt = options[i];
        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    return result;
};

var selectActionStyle = function(action_style_value) {
    return action_style[parseInt(action_style_value)];
};

//convert trigger_style to trigger_name
var selectTriggerStyle = function(trigger_style_value) {
    return trigger_style[parseInt(trigger_style_value)];
};

//convert action_style to action_name

var selectActionTitle = function(trigger_style_value) {
    return action_title[parseInt(trigger_style_value)];
};