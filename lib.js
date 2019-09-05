const ipc = require('electron').ipcRenderer;
ipc.send('test', 'ping');
ipc.on('test-reply', function (event, arg) {
    document.getElementById("ret").innerHTML = arg;
})