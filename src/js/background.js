// background.js
// connect to popup.js

console.log('background script running');

var toggle = false, status = 'off', tab_id = '', tab_url = '';

function toggleStatus() {
	toggle = !toggle;
	status = 'off';
	if(toggle) { status = 'on'; }
	alert('toggle status: ' + status);
}

function toggleExtension(tab){
	chrome.tabs.executeScript({ code: 'var extension_status = "'+status+'"' });
	chrome.tabs.executeScript({ file: 'gaze-controls.js' });
	tab_id = tab.id;
	tab_url = tab.url;
	// console.log(tab_url)
	alert('toggle extension - execute script');
}

function reloadContent(tabId, changeInfo, tab) {
    if (changeInfo.status=='complete' || tabId==tab_id && status=='on' || tab_url!=tab.url) {
        toggleExtension(tab);
    }
}

chrome.tabs.onCreated.addListener(function(tab) {
    toggleStatus();
    toggleExtension(tab);
    alert('onCreated');
});

chrome.tabs.onUpdated.addListener(reloadContent);

