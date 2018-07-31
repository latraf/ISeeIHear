/* popup.js */

/*** UI ***/
$(function() {
	$('.modality').checkboxradio({
		icon: false
	});
});

/* redirects to a new tab when "How To"is clicked */
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('how_to').addEventListener('click', howToTab);
});

function howToTab() {
	chrome.tabs.create({'url': 'src/howto.html'}, function(tab) {
	});
}

/* saves modality into chrome storage when button is clicked */
var mode_out = '', mode = 0;

function saveSettings() {
	mode = $('input[type="radio"]:checked').val();
	switch(mode) {
		case '1': mode_out = 'Gaze'; break;
		case '2': mode_out = 'Voice'; break;
		case '3': mode_out = 'Both'; break;
	}
	// $("#mode").html("Mode: " + mode_out);

	console.log(mode_out);
	chrome.storage.local.set({'mode': mode});
	console.log('Saved! Mode: ' + mode_out);

	if(mode == '1' | mode == '3') {
		connectWebGazer();
		console.log('connecting webgazer...');
		// alert('connecting webgazer...');
	}
	console.log(mode_out);
}

/* loads previously saved modality */
function loadSettings() {
	chrome.storage.local.get('mode', function(result) {
		mode = result.mode;
		switch(mode) {
			case '1': mode_out = 'Gaze';
					$('#radio-1').prop('checked', true);
					break;
			case '2': mode_out = 'Voice'; 
					$('#radio-2').prop('checked', true);
					break;
			case '3': mode_out = 'Both'; 
					$('#radio-3').prop('checked', true);
					break;
		}
		// $("#mode").html("Mode: " + mode_out);
	});
	console.log(mode_out);
}

function connectWebGazer() {
	chrome.tabs.executeScript({
		file: 'src/js/gaze-controls.js'
	});
}

/* calls loading function everytime popup.html loads*/
window.onload = function() {
	loadSettings();
	console.log("previous settings loaded!");
	document.getElementById('save_btn').addEventListener('click', saveSettings);
	document.getElementById('click_me').addEventListener('click', connectWebGazer);
	console.log("added event listener!");
}