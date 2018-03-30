// popup.js

/*** UI ***/
$(function() {
	$('.modality').checkboxradio({
		icon: false
	});
});

/* redirects to a new tab when "How To"is clicked */
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById("howTo").addEventListener("click", howToTab);
});

function howToTab() {
	// [!!!] create separate url on how to use the extension
	chrome.tabs.create({'url': 'src/toolbar.html'}, function(tab) {
	});
}

/* saves modality into chrome storage when button is clicked */
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById("saveBtn").addEventListener("click", saveSettings);
});

var modeOut = "", mode = 0;

function saveSettings() {
	mode = $('input[name=radio-1]:checked').val();
	switch(mode) {
		case '1': modeOut = "Gaze"; break;
		case '2': modeOut = "Voice"; break;
		case '3': modeOut = "Both"; break;
	}
	// $("#mode").html("Mode: " + modeOut);

	// console.log(modeOut);
	alert("Saved! Mode: " + modeOut);
	chrome.storage.local.set({'mode': mode});
}

/* loads previously saved modality */
function loadSettings() {
	chrome.storage.local.get('mode', function(result) {
		mode = result.mode;
		switch(mode) {
			case '1': modeOut = "Gaze"; break;
			case '2': modeOut = "Voice"; break;
			case '3': modeOut = "Both"; break;
		}
		// $("#mode").html("Mode: " + modeOut);
		// alert(modeOut);
		
		switch(mode) {
			case "1": $('#radio-1').prop("checked", true); break;
			case "2": $('#radio-2').prop("checked", true); break;
			case "3": $('#radio-3').prop("checked", true); break;
		}
	});
}

/* calls loading function everytime popup.html loads*/
window.onload = function() {
	loadSettings();
}