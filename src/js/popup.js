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
	mode = $('input[name="radio"]:checked').val();
	console.log('mode ' + mode);
	switch(mode) {
		case '1': mode_out = 'GAZE'; break;
		case '2': mode_out = 'VOICE'; break;
		case '3': mode_out = 'BOTH'; break;
	}

	var data = {'mode' : mode_out}
	setData(data);

	if(data['mode']=='GAZE') {
		connectGaze();
		console.log('connecting webgazer...');
		// alert('connecting webgazer...');
	}
	else if(data['mode']=='VOICE') {
		connectVoice();
	}
	else {
		connectBoth();
	}
	console.log("saved " + mode_out);
}

/* loads previously saved modality */
function loadSettings() {
	console.log("settings loaded!");

	getData(function(data) {
		mode_out = data['mode'];
		if(mode_out=='GAZE') {
			$('#radio-1').prop("checked", true);
			if(!data['gaze_mode']) connectGaze();
		}
		else if(mode_out=='VOICE') {
			$('#radio-2').prop("checked", true);
			if(!data['voice_mode']) connectVoice();
		}
		else if(mode_out=='BOTH') {
			$('#radio-3').prop("checked", true);
			if(!data['both_mode']) connectBoth();
		}
		else console.log('Error!');
		console.log("loaded " + mode_out);


	});
}

function removeControls() {
	chrome.tabs.executeScript({file: ''});
}

function connectGaze() {
	var data = {
		'gaze_mode' : true,
		'voice_mode' : false,
		'both_mode' : false
	};
	console.log('connectGaze');
	setData(data);
	chrome.tabs.executeScript({file: 'src/js/gaze-controls.js'});
	// chrome.tabs.executeScript({file: ''});   // script that will disable voice-controls
}

function connectVoice() {
	var data = {
		'gaze_mode' : false,
		'voice_mode' : true,
		'both_mode' : false
	};
	console.log('connectVoice');
	setData(data);
	// chrome.tabs.executeScript({file: ''});   // script that will enable voice-controls
	// chrome.tabs.executeScript({file: ''});   // script that will disable gaze-controls
}

function connectBoth() {
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

/* calls loading function everytime popup.html loads*/
window.onload = function() {
	loadSettings();
	console.log("popup loaded!");
	document.getElementById('save_btn').addEventListener('click', saveSettings);
	document.getElementById('turn_off').addEventListener('click', removeControls);
}