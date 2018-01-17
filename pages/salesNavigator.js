var ipcRenderer = require('electron').ipcRenderer;
document.addEventListener('DOMContentLoaded', function() {
    ipcRenderer.sendToHost('result', document.body.innerHTML);
});