/* popup.js */

/*** UI ***/
$(function() {
	$('.modality').checkboxradio({
		icon: false
	});
});

/* redirects to a new tab when "How To"is clicked */
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('howTo').addEventListener('click', howToTab);
});

function howToTab() {
	chrome.tabs.create({'url': 'src/howto.html'}, function(tab) {
	});
}

/* saves modality into chrome storage when button is clicked */
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('saveBtn').addEventListener('click', saveSettings);
	document.getElementById('clickMe').addEventListener('click', connectWebGazer);
});

var modeOut = '', mode = 0;

function saveSettings() {
	mode = $('input[name=radio-1]:checked').val();
	switch(mode) {
		case '1': modeOut = 'Gaze'; break;
		case '2': modeOut = 'Voice'; break;
		case '3': modeOut = 'Both'; break;
	}
	// $("#mode").html("Mode: " + modeOut);

	// console.log(modeOut);
	console.log('Saved! Mode: ' + modeOut);
	chrome.storage.local.set({'mode': mode});

	if(mode == '1' | mode == '3') {
		connectWebGazer();
		console.log('connecting webgazer...');
		// alert('connecting webgazer...');
	}
}

/* loads previously saved modality */
function loadSettings() {
	chrome.storage.local.get('mode', function(result) {
		mode = result.mode;
		switch(mode) {
			case '1': modeOut = 'Gaze';
					$('#radio-1').prop('checked', true);
					break;
			case '2': modeOut = 'Voice'; 
					$('#radio-2').prop('checked', true);
					break;
			case '3': modeOut = 'Both'; 
					$('#radio-3').prop('checked', true);
					break;
		}
		// $("#mode").html("Mode: " + modeOut);
		// alert(modeOut);
	});
}


/* function to connect webgazer.js to the extension */
function connectWebGazer() {
	chrome.tabs.executeScript({file: 'src/js_ext/webgazer.js'}, function() {
		chrome.tabs.executeScript({file: 'src/js/gaze-controls.js'});
		alert("connectWebGazer()");
	});
	// chrome.tabs.executeScript(null, {
	// 	file: 'gaze-controls.js'
	// });
}

/* calls loading function everytime popup.html loads*/
window.onload = function() {
	// loadSettings();
	console.log("popup loaded!");
	// alert("popup loaded!");
}