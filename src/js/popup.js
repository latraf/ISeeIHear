// popup.js

/* storing data into chrome storage */
function setObjData(obj) {
	chrome.storage.local.set(obj, function() {
		console.log('Object Saved!', obj);
	});
}

/* getting data from chrome storage */
function getObjData(obj) {
	chrome.storage.local.get(null, callback);
}


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

var mode = "";

function saveSettings() {
	mode = $('input[name=radio-1]:checked').attr('id');
	switch(mode) {
		case 'radio-1': mode = "Gaze"; break;
		case 'radio-2': mode = "Voice"; break;
		case 'radio-3': mode = "Both"; break;
	}
	$("#mode").html("Mode: " + mode);

	console.log(mode);

	chrome.storage.local.set({'mode': mode});
}

function loadSettings() {
	mode = "";

	chrome.storage.local.get('mode', function(result) {
		mode = result.mode;
		$("#mode").html("Mode: " + mode);
		alert(mode);
	})
}

window.onload = function() {
	loadSettings();
}