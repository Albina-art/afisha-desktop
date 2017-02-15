// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
window.show = function y(teml){
	document.getElementById('app').innerHTML = teml
}
window.help = {
  setHandler: (id, ev, fn) => document.getElementById(id).addEventListener(ev, fn)
}
window.controller = {}

const shell = require('electron').remote.shell;

$(document).on('click', 'a[href^="http"]', (event) => {
    event.preventDefault();
    shell.openExternal(this.href);
});

