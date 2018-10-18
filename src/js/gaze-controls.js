/* gaze-controls.js (insert.js kay chris) */
console.log('gc on');

document.documentElement.style.height = '100%';
document.documentElement.style.width = '100%';

function setData(data) {
	chrome.storage.local.set(data, function() {});
}

function getData(callback) {
	chrome.storage.local.get(null, callback);
}


/* ARRROWS AND BUTTONS FOR GAZE UI */

// create arrows
var arrow_up = document.createElement('div');
var arrow_down = document.createElement('div');
var arrow_right = document.createElement('div');
var arrow_left = document.createElement('div');

arrow_up.setAttribute('id', 'arrow_up');
arrow_down.setAttribute('id', 'arrow_down');
arrow_left.setAttribute('id', 'arrow_left');
arrow_right.setAttribute('id','arrow_right');

arrow_up.setAttribute('class', 'arrows');
arrow_down.setAttribute('class', 'arrows');
arrow_left.setAttribute('class', 'arrows');
arrow_right.setAttribute('class', 'arrows');

// create buttons
var click_btn = document.createElement('div');
var focus_btn = document.createElement('div');
var press_btn = document.createElement('div');
var open_btn = document.createElement('div');

click_btn.setAttribute('id', 'click_btn');
focus_btn.setAttribute('id', 'focus_btn');
press_btn.setAttribute('id', 'press_btn');
open_btn.setAttribute('id', 'open_btn');

click_btn.setAttribute('class', 'gaze_btns');
focus_btn.setAttribute('class', 'gaze_btns');
press_btn.setAttribute('class', 'gaze_btns');
open_btn.setAttribute('class', 'gaze_btns');

click_btn.prepend('Click!');
focus_btn.prepend('Focus!');
press_btn.prepend('Press!');
open_btn.prepend('Open!');


var toggle1_btn = document.createElement('div');
var toggle2_btn = document.createElement('div');

toggle1_btn.setAttribute('id', 'toggle1_btn');
toggle2_btn.setAttribute('id', 'toggle2_btn');

toggle1_btn.setAttribute('class', 'toggle_btn');
toggle2_btn.setAttribute('class', 'toggle_btn');

toggle1_btn.prepend('Toggle to Gaze Buttons!');
toggle2_btn.prepend('Toggle to Arrows!');




var arrows_div = document.createElement('div');
var gaze_btns_div = document.createElement('div');
var keypad1_div = document.createElement('div');
var keypad2_div = document.createElement('div');
var keypad3_div = document.createElement('div');
var keypad4_div = document.createElement('div');
var keypad5_div = document.createElement('div');

arrows_div.setAttribute('id', 'arrows_div');
arrows_div.setAttribute('class', 'big_divs');

gaze_btns_div.setAttribute('id', 'gaze_btns_div');
gaze_btns_div.setAttribute('class', 'big_divs');

// arrows_div.appendChild(arrow_up);
// arrows_div.appendChild(arrow_down);
// arrows_div.appendChild(arrow_left);
// arrows_div.appendChild(arrow_right);
// arrows_div.appendChild(toggle1_btn);

// gaze_btns_div.appendChild(click_btn);
// gaze_btns_div.appendChild(focus_btn);
// gaze_btns_div.appendChild(press_btn);
// gaze_btns_div.appendChild(open_btn);
// gaze_btns_div.appendChild(toggle2_btn);

// document.body.appendChild(arrows_div);
// document.body.appendChild(gaze_btns_div);

// arrows_div.style.opacity = 0;
// gaze_btns_div.style.opacity = 0;

/* END */

var calibration1_div = document.createElement('div');
var calibration2_div = document.createElement('div');
var calibration3_div = document.createElement('div');

var calibration_notes = document.createElement('span');
calibration_notes.setAttribute('id', 'calibration_notes');
calibration_notes.innerHTML = '<center> <h3> Calibration: </h3>' + 
'The red point represents the predictions of your eye movements. <br>' +
'Click each element <strong> <i> five (5) times </i> </strong>, whilst looking at the button. <br> ' +
'<i> Always follow the mouse with your eyes. </i> </center>';


calibration1_div.setAttribute('id', 'calibration1_div');
calibration1_div.setAttribute('class', 'calibration_divs');

calibration1_div.appendChild(arrow_up);
calibration1_div.appendChild(arrow_down);
calibration1_div.appendChild(arrow_left);
calibration1_div.appendChild(arrow_right);
calibration1_div.appendChild(toggle1_btn);
calibration1_div.appendChild(calibration_notes);

arrow_up.style.opacity = 0.2;
arrow_down.style.opacity = 0.2;
arrow_left.style.opacity = 0.2;
arrow_right.style.opacity = 0.2;
toggle1_btn.style.opacity = 0.2;

document.body.appendChild(calibration1_div);


/* CALIBRATION */

var calibrated=0;

$(document).ready(function() {
	setPosition();

	var num_clicks;
	$('#arrow_up').on('click', function() {
		if(num_clicks===undefined) num_clicks=0;

		num_clicks++;
		console.log(num_clicks);

		if(num_clicks<5) {
			var opacity = 0.2*num_clicks+0.2;
			$(this).css('opacity', opacity);
		}
		else if(num_clicks===5) {
			calibrated++;
			num_clicks=0;
			console.log('calibrated: ' + calibrated);
			calibration1_div.removeChild(arrow_up);
			arrows_div.appendChild(arrow_up);
		}

		if(calibrated===5) {
			console.log('all calibrated');
			document.body.removeChild(calibration1_div);
			document.body.appendChild(arrows_div);
		}
	});


	$('#arrow_down').on('click', function() {
		if(num_clicks===undefined) num_clicks=0;

		num_clicks++;
		console.log(num_clicks);

		if(num_clicks<5) {
			var opacity = 0.2*num_clicks+0.2;
			$(this).css('opacity', opacity);
		}
		else if(num_clicks===5) {
			calibrated++;
			num_clicks=0;
			console.log('calibrated: ' + calibrated);
			calibration1_div.removeChild(arrow_down);
			arrows_div.appendChild(arrow_down);
		}

		if(calibrated===5) {
			console.log('all calibrated');
			document.body.removeChild(calibration1_div);
			document.body.appendChild(arrows_div);
		}
	});

	$('#arrow_left').on('click', function() {
		if(num_clicks===undefined) num_clicks=0;

		num_clicks++;
		console.log(num_clicks);

		if(num_clicks<5) {
			var opacity = 0.2*num_clicks+0.2;
			$(this).css('opacity', opacity);
		}
		else if(num_clicks===5) {
			calibrated++;
			num_clicks=0;
			console.log('calibrated: ' + calibrated);
			calibration1_div.removeChild(arrow_left);
			arrows_div.appendChild(arrow_left);
		}

		if(calibrated===5) {
			console.log('all calibrated');
			document.body.removeChild(calibration1_div);
			document.body.appendChild(arrows_div);
		}
	});

	$('#arrow_right').on('click', function() {
		if(num_clicks===undefined) num_clicks=0;

		num_clicks++;
		console.log(num_clicks);

		if(num_clicks<5) {
			var opacity = 0.2*num_clicks+0.2;
			$(this).css('opacity', opacity);
		}
		else if(num_clicks===5) {
			calibrated++;
			num_clicks=0;
			console.log('calibrated: ' + calibrated);
			calibration1_div.removeChild(arrow_right);
			arrows_div.appendChild(arrow_right);
		}

		if(calibrated===5) {
			console.log('all calibrated');
			document.body.removeChild(calibration1_div);
			document.body.appendChild(arrows_div);
		}
	});

	$('#toggle1_btn').on('click', function() {
		if(num_clicks===undefined) num_clicks=0;

		num_clicks++;
		console.log(num_clicks);

		if(num_clicks<5) {
			var opacity = 0.2*num_clicks+0.2;
			$(this).css('opacity', opacity);
		}
		else if(num_clicks===5) {
			calibrated++;
			num_clicks=0;
			console.log('calibrated: ' + calibrated);
			calibration1_div.removeChild(toggle1_btn);
			arrows_div.appendChild(toggle1_btn);
		}

		if(calibrated===5) {
			console.log('all calibrated');
			document.body.removeChild(calibration1_div);
			document.body.appendChild(arrows_div);
		}
	});


});

/* INDIVIDUAL FUNCTIONALITIES ON UI ELEMENTS */

function setPosition() {
	var data = {};
	var element_arr = ['arrow_down', 'arrow_up', 'arrow_left', 'arrow_right', 'toggle1_btn', 'toggle2_btn',  'click_btn', 'press_btn', 'focus_btn', 'open_btn'];

	element_arr.forEach(function(element) {
		if(document.getElementById(element)) {

			var box = document.getElementById(element).getBoundingClientRect();
			var element_coordinates = { 'x' : box.x, 'y' : box.y, 'height' : box.height, 'width' : box.width };
			data[element] = element_coordinates;
		}
	});
	setData(data);
}

function setElementCoordinates(element, x, y) {
	element.style.left = x+'px';
	element.style.top = y+'px';
}