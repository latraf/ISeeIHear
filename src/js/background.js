// background.js
// connect to popup.js

console.log('background script running');

function setData(data) {
	chrome.storage.local.set(data, function() {
		console.log(data);
	});
}

function getData(callback) {
	chrome.storage.local.get(null, callback);
}

chrome.tabs.onUpdated.addListener(maintainScript);

var curr_tab_id = 0, curr_window_id = 0;

function maintainScript(tabId, changeInfo, tab) {

	console.log('tab updated');

	curr_tab_id = tab.id;
	curr_window_id = tab.windowId;

	getData(function (data) {
		var mode = data['mode'];
		var active_tab_id = data['active_tab_id'];
		var active_window_id = data ['active_window_id'];

		if(changeInfo.status=='complete') {
				if(mode=='GAZE') connectGaze(curr_tab_id);
				else if(mode=='VOICE') connectVoice(curr_tab_id);
				else if(mode=='BOTH') connectBoth(curr_tab_id);
				else if(mode=='OFF') {
					console.log('Modes are turned off.');
					removeControls(curr_tab_id);
				}
				else console.log('Error!');	
		}

		// console.log('Active Tab ID: ' + active_tab_id);
		// console.log('Active Window ID: ' + active_window_id);
		// console.log('Current Tab ID: ' + curr_tab_id);
		// console.log('Current Window ID: ' + curr_window_id);

		// console.log(tab);
	});	
}

function connectGaze(tab_id) {
	var data = {
		'gaze_mode' : true,
		'voice_mode' : false,
		'both_mode' : false
	};
	console.log('connectGaze');
	setData(data);
	chrome.tabs.executeScript(tab_id, {file: 'src/js_ext/jquery-3.1.1.min.js'});
	// chrome.tabs.executeScript(tab_id, {file: 'src/js_ext/webgazer.js'}, function() {
		chrome.tabs.executeScript({file: 'src/js/gaze-controls-off.js'});
	// });
	chrome.tabs.executeScript(tab_id, {file: 'src/js/gaze-controls.js'});
	chrome.tabs.executeScript(tab_id, {file: 'src/js_ext/webgazer.js'}, function() {
		chrome.tabs.executeScript({file: 'src/js/gaze-functions.js'});
	});
	// chrome.tabs.executeScript(tab_id, {file: ''});   // script that will disable voice-controls
}

function connectVoice(tab_id) {
	var data = {
		'gaze_mode' : false,
		'voice_mode' : true,
		'both_mode' : false
	};
	alert('connectVoice');
	setData(data);
	chrome.tabs.executeScript(tab_id, {file: 'src/js_ext/jquery-3.1.1.min.js'});
	// chrome.tabs.executeScript(tab_id, {file: 'src/js_ext/webgazer.js'}, function() {
		chrome.tabs.executeScript({file: 'src/js/gaze-controls-off.js'});
	// });
	// chrome.tabs.executeScript(tab_id, {file: ''});   // script that will disable gaze-controls
	// chrome.tabs.executeScript(tab_id, {file: ''});   // script that will enable voice-controls
}

function connectBoth(tab_id) {
	var data = {
		'gaze_mode' : false,
		'voice_mode' : false,
		'both_mode' : true
	};
	alert('connectBoth');
	setData(data);
	chrome.tabs.executeScript(tab_id, {file: 'src/js_ext/jquery-3.1.1.min.js'});
	// chrome.tabs.executeScript(tab_id, {file: 'src/js_ext/webgazer.js'}, function() {
		chrome.tabs.executeScript({file: 'src/js/gaze-controls-off.js'});
	// });
	// chrome.tabs.executeScript(tab_id, {file: ''});   // script that will enable gaze-controls
	// chrome.tabs.executeScript(tab_id, {file: ''});   // script that will enable voice-controls
}

function removeControls(tab_id) {
	var data = {
		'gaze_mode' : false,
		'voice_mode' : false,
		'both_mode' : false,
		'mode' : 'OFF'
	};
	alert('Modes are turned off.');
	setData(data);
	chrome.tabs.executeScript(tab_id, {file: 'src/js_ext/jquery-3.1.1.min.js'});
	// chrome.tabs.executeScript(tab_id, {file: 'src/js_ext/webgazer.js'}, function() {
		chrome.tabs.executeScript({file: 'src/js/gaze-controls-off.js'});
	// });
}

chrome.runtime.onInstalled.addListener(function(extension) {
	if(extension.reason == 'install') {
		var data = { 'gaze_calibrated' : false };
		setData(data);
		alert('newly installed!');
	}
});