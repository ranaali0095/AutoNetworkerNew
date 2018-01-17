var mainTag = document.getElementsByClassName("main")[0];
var footerTag = document.getElementsByTagName("footer")[0];
mainTag.style.paddingRight = "20px";
footerTag.style.paddingRight = "20px";

var allDataFromAutomation = {};
var allDataFromMessageTemplate = {};
var addToAutomationModal = document.getElementById('addToAutomationModal');

var webviewTag = document.getElementById('foo');
var profileInfo = '';
previousURL = '';

var showAutomationInputModal = document.getElementById('showAutomationInputModal');

var addEvent = function() {
    // var radiobuttons = document.getElementsByTagName('input');
    // for (i = 0; i < radiobuttons.length; i++) {
    //     if (radiobuttons[i].type == 'radio') {
    //         radiobuttons[i].addEventListener('click', function() {
                //console.log('asdf');
                //document.getElementById(this.name).innerText = this.value;
    //         });
    //     }
    // }
};

var showMessageStyleLinkedIn = function(selectDom) {
    if (selectDom.value == 'customMessages') {
        document.getElementById(selectDom.id + 'CustomLI').style.display = 'block';
        document.getElementById(selectDom.id + 'TemplateLI').style.display = 'none';
    }
    if (selectDom.value == 'selectFromTemplate') {
        document.getElementById(selectDom.id + 'CustomLI').style.display = 'none';
        document.getElementById(selectDom.id + 'TemplateLI').style.display = 'block';
    }
};

webviewTag.addEventListener('ipc-message', function(e) {
    // console.log('e.args', e.args[0]);
    profileInfo = e.args[0];
});

var loadstart = function() {
    webviewTag.preload = 'salesNavigator.js';
    //console.log(webviewTag.getURL());
    if (webviewTag && webviewTag.getWebContents() && previousURL != webviewTag.getURL()) {
        webviewTag.preload = 'salesNavigator.js';
        previousURL = webviewTag.getURL();
        // webviewTag.reload();
        return;
    }
};

var loadstop = function() {
    var pageURL = webviewTag.getURL();
    var matchContent = document.getElementById('matchContent');
    if (pageURL.indexOf('https://www.linkedin.com/search/results/people/') >= 0) {
        matchContent.innerHTML = document.getElementById('peoplePage').innerHTML;
        addEvent();
        document.getElementById('showAutomationInputModal').addEventListener('click', function() {
            for (var i = 0; i < document.getElementById('automationsInput').options.length; i++) {
                if (document.getElementById('automationsInput').options[i].selected == true) {
                    document.getElementById('automationsInput').options[i].selected = false;
                }
            }
            $('#automationsInput').select2();
            $('#modal-input-automations').modal('show');
        });

        document.getElementById('showTagInputModal').addEventListener('click', function() {
            document.getElementById('addToTagModal').innerHTML = '<div class="form-group"><label for="nf-password">Input Tags</label><select id="tagsInput" style="width:100%" multiple></select></div></div>';
            $('#tagsInput').select2({
                tags: true,
                tokenSeparators: [',']
            });
            $('#modal-input-tags').modal('show');
        });

        document.getElementById('showMessageEditModal').addEventListener('click', function() {
            $('#modal-input-messages').modal('show');
        });

    } else if (pageURL.indexOf('https://www.linkedin.com/in/') >= 0) {
        webviewTag.addEventListener('ipc-message', function(e) {
            // console.log('e.args', e.args[0]);
        });
        matchContent.innerHTML = document.getElementById('profileConnectedPage').innerHTML;
        // console.log(profileInfo);
        if (profileInfo.indexOf('connected Date') >= 0) {
            // console.log('success');
        } else {
            // console.log('failed');
        }
        addEvent();
        document.getElementById('showAutomationProfileInputModal').addEventListener('click', function() {
            for (var i = 0; i < document.getElementById('automationsInput').options.length; i++) {
                if (document.getElementById('automationsInput').options[i].selected == true) {
                    document.getElementById('automationsInput').options[i].selected = false;
                }
            }
            $('#automationsInput').select2();
            $('#modal-input-automations').modal('show');
        });

        document.getElementById('showTagProfileInputModal').addEventListener('click', function() {
            document.getElementById('addToTagModal').innerHTML = '<div class="form-group"><label for="nf-password">Input Tags</label><select id="tagsInput" style="width:100%" multiple></select></div></div>';
            $('#tagsInput').select2({
                tags: true,
                tokenSeparators: [',']
            });
            $('#modal-input-tags').modal('show');
        });

        document.getElementById('showMessageProfileEditModal').addEventListener('click', function() {
            $('#modal-input-messages').modal('show');
        });
    } else if (pageURL.indexOf('https://www.linkedin.com/groups/') >= 0) {
        matchContent.innerHTML = document.getElementById('groupPage').innerHTML;
        addEvent();
    } else {
        matchContent.innerHTML = '<h1>Visit Search Page or Group page to enable Actions</h1>';
    }
    //console.log(pageURL);
};

webviewTag.addEventListener('did-start-loading', loadstart);
webviewTag.addEventListener('did-stop-loading', loadstop);


// get all docs of table_automation
table_automation ? table_automation.allDocs({
    include_docs: true
}).then(function(result) {
    // handle result
    allDataFromAutomation = result;
    allDataFromAutomationContent = '<select id="automationsInput" style="width:100%" multiple>';
    for (var i = 0; i < allDataFromAutomation.rows.length; i++) {
        allDataFromAutomationContent += '<option value="' + allDataFromAutomation.rows[i].doc._id + '">' + allDataFromAutomation.rows[i].doc.automation_name + '</option>';
    }
    allDataFromAutomationContent += '</select>';
    console.log(allDataFromAutomationContent);
    addToAutomationModal.innerHTML = allDataFromAutomationContent;

}).catch(function(err) {
    console.log(err);
}) : null

// get all docs of table_message_template
table_message_template.allDocs({
    include_docs: true
}).then(function(result) {
    // handle result
    allDataFromMessageTemplate = result;
    for (var i = 0; i < allDataFromMessageTemplate.rows.length; i++) {
        var opt = document.createElement('option');
        opt.value = allDataFromMessageTemplate.rows[i].doc._id;
        opt.text = allDataFromMessageTemplate.rows[i].doc._id;
        console.log(opt.value);
        console.log(opt.text);
        document.getElementById('sendRecomRequestSelectListLI').appendChild(opt);
        if (i == 0) {
            document.getElementById('sendRecomRequestTextListLI').value = allDataFromMessageTemplate.rows[i].doc.message_text;
        }
    }
}).catch(function(err) {
    console.log(err);
});

document.getElementById('sendRecomRequestSelectListLI').addEventListener('change', function() {
    for (var i = 0; i < allDataFromMessageTemplate.rows.length; i++) {
        if (document.getElementById('sendRecomRequestSelectListLI').value == allDataFromMessageTemplate.rows[i].doc._id) {
            document.getElementById('sendRecomRequestTextListLI').value = allDataFromMessageTemplate.rows[i].doc.message_text;
        }
    }
});
