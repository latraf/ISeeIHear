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

	console.log('tab reloaded');
	// chrome.tabs.reload();
	chrome.tabs.executeScript(tabId, {file: 'src/js_ext/jquery-3.1.1.min.js'}, function() {
		chrome.tabs.executeScript(tabId, {file: 'src/js/gaze-controls-off.js'});
		// chrome.tabs.executeScript(tabId, {file: 'src/js/voice-off.js'});	
	});
	var data = { 'gaze_toggle' :  false };
	setData(data);

	getData(function (data) {
		var mode = data['mode'];

		if(changeInfo.status=='complete') {
				if(mode=='GAZE') connectGaze();
				else if(mode=='VOICE') connectVoice();
				else if(mode=='BOTH') connectBoth();
				else if(mode=='OFF') {
					console.log('Modes are turned off.');
					removeControls();
				}
				else console.log('Error!');	
		}
	});	
}

function connectGaze() {
	getData(function(data) {
		if(!data['gaze_toggle']) {
			var data = {
				'gaze_mode' : true,
				'voice_mode' : false,
				'both_mode' : false,
				'gaze_toggle' : true
			};
			console.log('connectGaze');
			setData(data);
			// chrome.tabs.executeScript({file: 'src/js_ext/jquery-3.1.1.min.js', runAt: 'document_start'});
			// chrome.tabs.executeScript({file: 'src/js/gaze-controls-off.js', runAt: 'document_end'});
			// chrome.tabs.executeScript({file: 'src/js/voice-off.js', runAt: 'document_end'});
			chrome.tabs.executeScript({file: 'src/js_ext/webgazer.js', runAt: 'document_end'}, function() {
				chrome.tabs.executeScript({file: 'src/js/gaze-controls.js', runAt: 'document_end'});
				chrome.tabs.executeScript({file: 'src/js/gaze-functions.js', runAt: 'document_end'});
			});	
		}
	})
}

function connectVoice() {
	var data = {
		'gaze_mode' : false,
		'voice_mode' : true,
		'both_mode' : false
	};
	console.log('connectVoice');
	setData(data);
	chrome.tabs.executeScript({file: 'src/js_ext/jquery-3.1.1.min.js'});
	// chrome.tabs.executeScript({file: 'src/js/gaze-controls-off.js'});
	/* script that will enable voice-controls */
	chrome.tabs.executeScript({file: 'src/js/voice.js'});
}

function connectBoth() {
	var data = {
		'gaze_mode' : false,	
		'voice_mode' : false,
		'both_mode' : true
	};
	alert('connectBoth');
	setData(data);
	chrome.tabs.executeScript({file: 'src/js_ext/jquery-3.1.1.min.js'});
	chrome.tabs.executeScript({file: 'src/js/gaze-controls-off.js'});
	// chrome.tabs.executeScript(tab_id, {file: ''});   // script that will enable gaze-controls
	// chrome.tabs.executeScript(tab_id, {file: ''});   // script that will enable voice-controls
}

function removeControls() {
	var data = {
		'gaze_mode' : false,
		'voice_mode' : false,
		'both_mode' : false,
		'mode' : 'OFF'
	};
	alert('Modes are turned off.');
	setData(data);
	chrome.tabs.executeScript({file: 'src/js_ext/jquery-3.1.1.min.js'});
	chrome.tabs.executeScript({file: 'src/js/gaze-controls-off.js'});
	chrome.tabs.executeScript({file: 'src/js/voice-off.js'});	
}

chrome.runtime.onInstalled.addListener(function(extension) {
	if(extension.reason == 'install') {
		alert('newly installed!');
		var data = { 'gaze_calibrated' : false };
		setData(data);
		// chrome.tabs.create( {url: chrome.extension.getURL("src/howto.html")}, function(){});
	}
});

chrome.runtime.onSuspend.addListener(function() {
	var data = { 'gaze_toggle' : false };
	setData(data);		
});

window.onbeforeunload = function() {
	var data = { 'gaze_toggle' : false };
	setData(data);	
}