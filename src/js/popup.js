/* popup.js */

/*** UI ***/
$(function() {
	$('.modality').checkboxradio({
		icon: false
	});
});

/* redirects to a new tab when "How To" is clicked */
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('how_to').addEventListener('click', howToTab);
});

function setData(data) {
	chrome.storage.local.set(data, function() {
		console.log(data);
	});
}

function getData(callback) {
	chrome.storage.local.get(null, callback);
}

function howToTab() {
	chrome.tabs.create({'url': 'src/howto.html'}, function(tab) {
	});
}

/* saves modality into chrome storage when button is clicked */
var mode_out = '', mode = 0;

function saveSettings() {
	// location.reload();
	var active_tab_id = 0, active_window_id = 0;

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var active_tab_id = tabs[0].id;
		var active_window_id = tabs[0].windowId;
		var data = {
			'active_tab_id' : active_tab_id,
			'active_window_id' : active_window_id
		};
		setData(data);
	});	


	mode = $('input[name="radio"]:checked').val();
	console.log('mode ' + mode);
	switch(mode) {
		case '1': mode_out = 'GAZE'; break;
		case '2': mode_out = 'VOICE'; break;
		case '3': mode_out = 'BOTH'; break;
	}

	var data = {'mode' : mode_out}
	setData(data);

	getData(function(data) {
		if(data['mode']=='GAZE') connectGaze(data['active_tab_id']);
		else if(data['mode']=='VOICE') connectVoice(data['active_tab_id']);
		else connectBoth(data['active_tab_id']);
		console.log("saved " + mode_out);
	});

}

/* loads previously saved modality */
function loadSettings() {
	console.log("settings loaded!");

	getData(function(data) {
		mode_out = data['mode'];
		if(mode_out=='GAZE') {
			$('#radio-1').prop("checked", true);
			// if(!data['gaze_mode']) connectGaze();
		}
		else if(mode_out=='VOICE') {
			$('#radio-2').prop("checked", true);
			// if(!data['voice_mode']) connectVoice();
		}
		else if(mode_out=='BOTH') {
			$('#radio-3').prop("checked", true);
			// if(!data['both_mode']) connectBoth();
		}
		else if(mode_out=='OFF')  {
			console.log('Modes are turned off.');
			$('#radio-1').prop("checked", false);
			$('#radio-2').prop("checked", false);
			$('#radio-3').prop("checked", false);
		}
		else console.log('Error!');
		console.log("loaded " + mode_out);
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
	// chrome.tabs.executeScript({file: ''});   // script that will disable voice-controls

	chrome.tabs.executeScript({file: 'src/js_ext/jquery-3.1.1.min.js'});
	chrome.tabs.executeScript({file: 'src/js/gaze-controls-off.js'});
	chrome.tabs.executeScript({file: 'src/js/voice-off.js'});
	chrome.tabs.executeScript({file: 'src/js/gaze-controls.js'});
	// chrome.tabs.executeScript({file: 'src/js_ext/webgazer.js'}, function() {
	// 	chrome.tabs.executeScript({file: 'src/js/gaze-functions.js'});
	// });
}

function connectVoice(tab_id) {
	var data = {
		'gaze_mode' : false,
		'voice_mode' : true,
		'both_mode' : false
	};
	console.log('connectVoice');
	setData(data);
	// script that will disable gaze-controls
	chrome.tabs.executeScript({file: 'src/js/gaze-controls-off.js'});
	chrome.tabs.executeScript({file: 'src/js/gaze-controls-off2.js'});
	// script that will enable voice-controls
	chrome.tabs.executeScript({file: 'src/js/voice.js'});
	
}

function connectBoth(tab_id) {
	var data = {
		'gaze_mode' : false,
		'voice_mode' : false,
		'both_mode' : true
	};
	console.log('connectBoth');
	setData(data);
	// chrome.tabs.executeScript({file: ''});   // script that will enable gaze-controls
	// chrome.tabs.executeScript({file: ''});   // script that will enable voice-controls
}

function removeControls() {
	var data = {
		'gaze_mode' : false,
		'voice_mode' : false,
		'both_mode' : false,
		'mode' : 'OFF'
	};
	console.log('Modes are turned off.');
	setData(data);
	// chrome.tabs.executeScript(tab_id, {file: 'src/js_ext/webgazer.js'}, function() {
		chrome.tabs.executeScript({file: 'src/js/gaze-controls-off2.js'});
	// });
}

/* calls loading function everytime popup.html loads*/
window.onload = function() {
	var curr_tab_id = 0, curr_window_id = 0;

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		curr_tab_id = tabs[0].id;
		curr_window_id = tabs[0].windowId;

		console.log(tabs[0]);
	});

	// console.log('Current Tab ID: ' + curr_tab_id);
	// console.log('Current Window ID: ' + curr_window_id);
	
	if(curr_tab_id) {
		chrome.tabs.executeScript(curr_tab_id, {file: 'src/js_ext/jquery-3.1.1.min.js'});
		chrome.tabs.executeScript(curr_tab_id, {file: 'src/js/gaze-controls-off.js'});
	}
	loadSettings();
	console.log("popup loaded!");
	document.getElementById('save_btn').addEventListener('click', saveSettings);
	document.getElementById('turn_off').addEventListener('click', removeControls);
}