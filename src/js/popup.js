/* popup.js */

/*** UI ***/
$(function() {
	$('.modality').checkboxradio({
		icon: false
	});
});

function setData(data) {
	chrome.storage.local.set(data, function() {});
}

function getData(callback) {
	chrome.storage.local.get(null, callback);
}

function howToTab() {
	chrome.tabs.create({'url': 'src/howto.html'}, function(tab) {});
}

/* saves modality into chrome storage when button is clicked */
var mode_out = '', mode = 0;

function saveSettings() {

	mode = $('input[name="radio"]:checked').val();
	console.log('mode ' + mode);
	switch(mode) {
		case '1': mode_out = 'GAZE'; 
							var calibrated = false;
							break;
		case '2': mode_out = 'VOICE'; break;
		case '3': mode_out = 'BOTH'; break;
	}

	var data = { 'mode' : mode_out, 'calibrated': calibrated };
	setData(data);

	chrome.tabs.reload();
}

/* loads previously saved modality */
function loadSettings() {
	console.log("settings loaded!");

	getData(function(data) {
		mode_out = data['mode'];
		if(mode_out=='GAZE') $('#radio-1').prop("checked", true);
		else if(mode_out=='VOICE') $('#radio-2').prop("checked", true);
		else if(mode_out=='BOTH') $('#radio-3').prop("checked", true);
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

function removeControls() {
	var data = {
		'gaze_mode' : false,
		'voice_mode' : false,
		'both_mode' : false,
		'mode' : 'OFF'
	};
	console.log('Modes are turned off.');
	setData(data);
	chrome.tabs.executeScript({file: 'src/js/gaze-controls-off2.js'});
	chrome.tabs.executeScript({file: 'src/js/voice-off.js'});
}

/* calls loading function everytime popup.html loads */
window.onload = function() {
	chrome.tabs.executeScript({file: 'src/js_ext/jquery-3.1.1.min.js'});
	chrome.tabs.executeScript({file: 'src/js/gaze-controls-off.js'});
	chrome.tabs.executeScript({file: 'src/js/voice-off.js'});

	loadSettings();
	console.log("popup loaded!");
	document.getElementById('save_btn').addEventListener('click', saveSettings);
	document.getElementById('turn_off').addEventListener('click', removeControls);
	document.getElementById('how_to').addEventListener('click', howToTab);
}