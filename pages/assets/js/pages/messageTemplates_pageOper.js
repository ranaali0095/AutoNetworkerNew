//select Templates
var addField_edit = document.getElementById('addField_edit');
var addField_create = document.getElementById('addField_create');

//Add buttons
var add_exText_edit = document.getElementById('add_exText_edit');
var add_exText_create = document.getElementById('add_exText_create');

//textarea
var textarea_message_edit = document.getElementById('textarea_message_edit');
var textarea_message_create = document.getElementById('textarea_message_create');

//save template button
var saveTemplateBtn = document.getElementById('saveTemplateBtn');
var cancelSaveTemplateBtn = document.getElementById('cancelSaveTemplateBtn');

//update template button
var updateTemplateBtn = document.getElementById('updateTemplateBtn');
var cancelUpdateTemplateBtn = document.getElementById('cancelUpdateTemplateBtn');

//edit modal name
var messNameTag = document.getElementById('messName');

//template name input
var templateNameCreate = document.getElementById('templateNameCreate');

//table Element
var messageTemplateList = document.getElementById('messageTemplateList');

//templateSelectTags
var selectTemplateEdit = document.getElementById('selectTemplateEdit');
var selectTemplateCreate = document.getElementById('selectTemplateCreate');

//close button
var closeEdit = document.getElementById('closeEdit');
var closeCreate = document.getElementById('closeCreate');

//deleteWindow
var deleteData = document.getElementById('deleteData');
var deleteTemplateBtn = document.getElementById('deleteTemplateBtn');


function validateInputBox(inputDom) {
    if (inputDom.value) {
        return true;
    } else {
        return false;
    }
}
//draw table function
function drawAllTemplate(response) {
    var length = selectTemplateCreate.options.length;
    for (i = 0; i < length; i++) {
        selectTemplateCreate.remove(0);
    }
    var length = selectTemplateEdit.options.length;
    for (i = 0; i < length; i++) {
        selectTemplateEdit.remove(0);
    }

    var templateList = response.rows;
    var optionCreate = document.createElement('option');
    optionCreate.text = 'None';
    optionCreate.value = 'none';
    selectTemplateCreate.appendChild(optionCreate);

    var optionEdit = document.createElement('option');
    optionEdit.text = 'None';
    optionEdit.value = 'none';
    selectTemplateEdit.appendChild(optionEdit);

    var messageTemplateListContent = '<table class="table largeTable">' +
        '<thead><tr><th>Name</th><th>Actions</th></tr></thead><tbody>';
    for (i = 0; i < templateList.length; i++) {
        var message_name = templateList[i].doc._id;
        var message_text = templateList[i].doc.message_text;

        var optionCreateTmp = document.createElement('option');
        optionCreateTmp.text = message_name;
        optionCreateTmp.value = message_text;
        selectTemplateCreate.appendChild(optionCreateTmp);

        var optionEditTmp = document.createElement('option');
        optionEditTmp.text = message_name;
        optionEditTmp.value = message_text;
        selectTemplateEdit.appendChild(optionEditTmp);

        messageTemplateListContent += '<tr><td>' + message_name + '</td><td>';
        messageTemplateListContent += '<button type="button" class="btn btn-info" data-toggle="modal" data-dismiss="modal" data-target="#modal-edit"' + 'onclick="showEditContent(\'' + message_text + '\',\'' + message_name + '\')"><i class="fa fa-edit"></i></button>';
        messageTemplateListContent += '<button type="button" class="btn btn-danger" data-toggle="modal" data-dismiss="modal" data-target="#modal-delete"' + 'onclick="deleteContent(\'' + message_text + '\',\'' + message_name + '\')"><i class="fa fa-trash-o"></i></button>';
        messageTemplateListContent += '</td></tr>';
    }
    messageTemplateListContent += '</tbody></table>';
    messageTemplateList.innerHTML = messageTemplateListContent;
}

//onload function
function loadAllTemplate() {
    getAllTableMessageTemplate().then(function(response) {
        drawAllTemplate(response);
    }).catch(function(err) {
        alert(err.message);
    });
}

//onload
loadAllTemplate();

///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////
//edit Window
////////////////////////////////

// input information to textarea
// for edit
add_exText_edit.addEventListener('click', function() {
    if (addField_edit.value != 'none') {
        var tmp = '{{Contact.' + addField_edit.value + '}}';
        var cursorPos = $('#textarea_message_edit').prop('selectionStart');
        var v = $('#textarea_message_edit').val();
        var textBefore = v.substring(0, cursorPos);
        var textAfter = v.substring(cursorPos, v.length);
        $('#textarea_message_edit').val(textBefore + tmp + textAfter);
    }
});

//change template select tag in edit window
selectTemplateEdit.addEventListener("change", function() {
    if (selectTemplateEdit.value != 'none') {
        textarea_message_edit.value = selectTemplateEdit.value;
    }
});

updateTemplateBtn.addEventListener('click', function() {
    if (validateInputBox(textarea_message_edit)) {
        var mess_name = messNameTag.innerText;
        var mess_text = textarea_message_edit.value;
        getDataTableMessageTemplate(mess_name).then(function(response) {
            return table_message_template.put({
                _id: mess_name,
                _rev: response._rev,
                message_text: mess_text
            });
        }).then(function(response) {
            alert('Template Updated');
            $('#modal-edit').modal('hide');
            loadAllTemplate();
        }).catch(function(err) {
            alert(err.message);
        });
    } else {
        alert('Please Complete Template');
        return;
    }
});

cancelUpdateTemplateBtn.addEventListener('click', function() {
    $('#modal-edit').modal('hide');
});

//show edit modal
function showEditContent(messCon, messName) {
    selectTemplateEdit.selectedIndex = 0;
    textarea_message_edit.value = messCon;
    addField_edit.selectedIndex = 0;
    messNameTag.innerText = messName;
}

//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////
//create Window
/////////////////////////////////


//format modal Content
function formatModalCreate() {
    selectTemplateCreate.selectedIndex = 0;
    textarea_message_create.value = '';
    addField_create.selectedIndex = 0;
    templateNameCreate.value = '';
}

//input information to textarea for create
add_exText_create.addEventListener('click', function() {
    if (addField_create.value != 'none') {
        var tmp = '{{Contact.' + addField_create.value + '}}';
        var cursorPos = $('#textarea_message_create').prop('selectionStart');
        var v = $('#textarea_message_create').val();
        var textBefore = v.substring(0, cursorPos);
        var textAfter = v.substring(cursorPos, v.length);
        $('#textarea_message_create').val(textBefore + tmp + textAfter);
    }
});

//click template save button
saveTemplateBtn.addEventListener('click', function() {
    if (validateInputBox(textarea_message_create) && validateInputBox(templateNameCreate)) {
        var doc = {
            _id: templateNameCreate.value,
            message_text: textarea_message_create.value
        };
        saveTableMessageTemplate(doc).then(function(response) {
            alert('Template Saved');
            $('#modal-create').modal('hide');
            formatModalCreate();
            loadAllTemplate();
        }).catch(function(err) {
            alert(err.message);
        });
    } else {
        alert('Please Complete Template');
        return;
    }
});

cancelSaveTemplateBtn.addEventListener('click', function() {
    $('#modal-create').modal('hide');
    formatModalCreate();
});

//change template select tag in create window
selectTemplateCreate.addEventListener("change", function() {
    if (selectTemplateCreate.value != 'none') {
        textarea_message_create.value = selectTemplateCreate.value;
    }
});

// when close button, format modal content
closeCreate.addEventListener("click", function() {
    formatModalCreate();
});

//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////
//Delete Content
/////////////////////////////////

function deleteContent(messCon, messName) {
    deleteData.innerText = messName;
}

deleteTemplateBtn.addEventListener('click', function() {
    var mess_name = deleteData.innerText;
    getDataTableMessageTemplate(mess_name).then(function(response) {
        return table_message_template.remove(response);
    }).then(function(response) {
        alert('Template Deleted.');
        $('#modal-delete').modal('hide');
        loadAllTemplate();
    }).catch(function(err) {
        alert('err.message');
    });
});

