/* gaze-controls.js (insert.js kay chris) */
console.log('gc on');

document.documentElement.style.height = '100%';
document.documentElement.style.width = '100%';

/* ARRROWS AND BUTTONS FOR GAZE UI */

// create arrows
var arrow_up = document.createElement('div');
var arrow_down = document.createElement('div');
var arrow_right = document.createElement('div');
var arrow_left = document.createElement('div');

// create buttons
var click_btn = document.createElement('div');
var focus_btn = document.createElement('div');
var press_btn = document.createElement('div');
var open_btn = document.createElement('div');

arrow_up.setAttribute('class', 'arrows');
arrow_down.setAttribute('class', 'arrows');
arrow_left.setAttribute('class', 'arrows');
arrow_right.setAttribute('class', 'arrows');

click_btn.setAttribute('class', 'gaze_btns');
focus_btn.setAttribute('class', 'gaze_btns');
press_btn.setAttribute('class', 'gaze_btns');
open_btn.setAttribute('class', 'gaze_btns');

arrow_up.setAttribute('id', 'arrow_up');
arrow_down.setAttribute('id', 'arrow_down');
arrow_left.setAttribute('id', 'arrow_left');
arrow_right.setAttribute('id','arrow_right');

click_btn.setAttribute('id', 'click_btn');
focus_btn.setAttribute('id', 'focus_btn');
press_btn.setAttribute('id', 'press_btn');
open_btn.setAttribute('id', 'open_btn');

click_btn.style.opacity='0';
focus_btn.style.opacity='0';
press_btn.style.opacity='0';
open_btn.style.opacity='0';

click_btn.prepend('Click!');
focus_btn.prepend('Focus!');
press_btn.prepend('Press!');
open_btn.prepend('Open!');

// append arrows into body of every website
document.body.appendChild(arrow_up);
document.body.appendChild(arrow_down);
document.body.appendChild(arrow_left);
document.body.appendChild(arrow_right);

// append buttons into body of every website
document.body.appendChild(click_btn);
document.body.appendChild(focus_btn);
document.body.appendChild(press_btn);
document.body.appendChild(open_btn);	

/* END */







/* FOR BRANCH gazeButtons1 */

// next and previous for every gaze button
var click_next = document.createElement('div');
var click_prev = document.createElement('div');
var click_center = document.createElement('div');

var focus_next = document.createElement('div');
var focus_prev = document.createElement('div');
var focus_center = document.createElement('div');

var press_next = document.createElement('div');
var press_prev = document.createElement('div');
var press_center = document.createElement('div');

var open_next = document.createElement('div');
var open_prev = document.createElement('div');
var open_center = document.createElement('div');


click_next.setAttribute('class', 'gaze_btns1');
click_prev.setAttribute('class', 'gaze_btns1');
focus_next.setAttribute('class', 'gaze_btns1');
focus_prev.setAttribute('class', 'gaze_btns1');
press_next.setAttribute('class', 'gaze_btns1');
press_prev.setAttribute('class', 'gaze_btns1');
open_next.setAttribute('class', 'gaze_btns1');
open_prev.setAttribute('class', 'gaze_btns1');

click_center.setAttribute('class', 'center_btns');
focus_center.setAttribute('class', 'center_btns');
press_center.setAttribute('class', 'center_btns');
open_center.setAttribute('class', 'center_btns');

click_prev.classList.add('gaze_prev');
focus_prev.classList.add('gaze_prev');
press_prev.classList.add('gaze_prev');
open_prev.classList.add('gaze_prev');

click_next.classList.add('gaze_next');
focus_next.classList.add('gaze_next');
press_next.classList.add('gaze_next');
open_next.classList.add('gaze_next');

click_next.setAttribute('id', 'click_next');
click_prev.setAttribute('id', 'click_prev');
focus_next.setAttribute('id', 'focus_next');
focus_prev.setAttribute('id', 'focus_prev');
press_next.setAttribute('id', 'press_next');
press_prev.setAttribute('id', 'press_prev');
open_next.setAttribute('id', 'open_next');
open_prev.setAttribute('id', 'open_prev');

click_center.setAttribute('id', 'click_center');
focus_center.setAttribute('id', 'focus_center');
press_center.setAttribute('id', 'press_center');
open_center.setAttribute('id', 'open_center');

click_next.style.opacity='0';
click_prev.style.opacity='0';
click_center.style.opacity='0';

focus_next.style.opacity='0';
focus_prev.style.opacity='0';
focus_center.style.opacity='0';

press_next.style.opacity='0';
press_prev.style.opacity='0';
press_center.style.opacity='0';

open_next.style.opacity='0';
open_prev.style.opacity='0';
open_center.style.opacity='0';

click_next.prepend('Click Next!');
click_prev.prepend('Click Prev!');
click_center.prepend('Select Link!');

focus_next.prepend('Focus Next!');
focus_prev.prepend('Focus Prev!');
focus_center.prepend('Select Inputfield!');

press_next.prepend('Press Next!');
press_prev.prepend('Press Prev!');
press_center.prepend('Select Button!');

// open_btn.prepend('Open!');
// open_btn.prepend('Open!');
// open_btn.prepend('Open!');

// append gazeButtons1 into body
document.body.appendChild(click_next);
document.body.appendChild(click_prev);
document.body.appendChild(focus_next);
document.body.appendChild(focus_prev);
document.body.appendChild(press_next);
document.body.appendChild(press_prev);
document.body.appendChild(open_next);
document.body.appendChild(open_prev);

document.body.appendChild(click_center);
document.body.appendChild(focus_center);
document.body.appendChild(press_center);
document.body.appendChild(open_center);

/* END */





/* ARROW BOXES, TOGGLE BUTTON, AND CALLIBRATION DIV */

var arrow_up_box = document.createElement('div');
var arrow_down_box = document.createElement('div');
var arrow_right_box = document.createElement('div');
var arrow_left_box = document.createElement('div');

arrow_up_box.setAttribute('id', 'arrow_up_box');
arrow_down_box.setAttribute('id', 'arrow_down_box');
arrow_right_box.setAttribute('id', 'arrow_right_box');
arrow_left_box.setAttribute('id', 'arrow_left_box');

arrow_up_box.setAttribute('class', 'horizontal_box');
arrow_down_box.setAttribute('class', 'horizontal_box');
arrow_right_box.setAttribute('class', 'vertical_box');
arrow_left_box.setAttribute('class', 'vertical_box');

document.body.appendChild(arrow_up_box);
document.body.appendChild(arrow_down_box);
document.body.appendChild(arrow_right_box);
document.body.appendChild(arrow_left_box);

var toggle_btn = document.createElement('div');
var toggle_btn_box = document.createElement('div');

toggle_btn.setAttribute('id', 'toggle_btn');
toggle_btn_box.setAttribute('id', 'toggle_btn_box');

document.body.appendChild(toggle_btn);
document.body.appendChild(toggle_btn_box);

var calibration_div = document.createElement('div');
calibration_div.setAttribute('class', 'calibration_div');
document.body.appendChild(calibration_div);

/* END */




function setData(data) {
	chrome.storage.local.set(data, function() {
		// console.log(data);
	});
}

function getData(callback) {
	chrome.storage.local.get(null, callback);
}






/* INDIVIDUAL FUNCTIONALITIES ON UI ELEMENTS */

var toggled=false;
// var scrolled=0, scroll_var=300;
var points_calibrated=0, calibration_points = {};

$(document).ready(function() {
	/* pre data collection */
	setPosition();
	createPoints();
	$('.calibration_btn:lt(-15)').remove();
	setBoxCoordinates();
	$('#toggle_btn:lt(-1)').remove();

	/* data collection */
	// 1. show help modal
	// insert help modal code here

	getData(function(data) {
		// alert(data['gaze_calibrated']);
		if(!data['gaze_calibrated']) {
			
			// 2. hide arrows, show data points
			plotPoints();
			$('#toggle_btn:lt(-1)').remove();
			hideArrows();
			
			// 3. collect data by clicking the points 
			// source: https://github.com/brownhci/WebGazer/blob/master/www/js/calibration.js
			$('.calibration_btn').on('click', function() {

				var id = $(this).attr('id');
				if (!calibration_points[id]) { // initialises if not done
					calibration_points[id]=0;
				}

				calibration_points[id]++; // increments values

				if (calibration_points[id]==5) { // turns yellow after 5 clicks
					$(this).css('background-color','yellow');
					$(this).prop('disabled', true); 
					points_calibrated++;
				} 
				else if (calibration_points[id]<5) {
					// gradually increase the opacity of calibration points when clicked
					var opacity = 0.2*calibration_points[id]+0.2;
					$(this).css('opacity',opacity);
				}

				// 4. after clicking all data points, hide points, show arrows
				if (points_calibrated >= 15){ // last point is calibrated
					alert('data collected');
					$(".calibration_btn").hide();
					showArrows();
					var data = { 'gaze_calibrated' : true };
					setData(data);
					alert('Webgazer Calibrated');
				}
			});
		}

	});

	// $('#click_btn').on('click', function() {
	// 	toggled=!toggled;
	// 	if(toggled) clickButton();
	// 	else removeLinks();
	// });

	// $('#press_btn').on('click', function() {
	// 	toggled=!toggled;
	// 	if(toggled) pressButton();
	// 	else removeButtons();
	// });

	// $('#focus_btn').on('click', function() {
	// 	toggled=!toggled;
	// 	if(toggled) focusButton();
	// 	else removeFields();
	// });

});








function setPosition() {
	var data = {};
	var element_arr = ['arrow_down', 'arrow_up', 'arrow_left', 'arrow_right', 'toggle_btn', 'click_btn', 'press_btn', 'focus_btn', 'open_btn'];

	element_arr.forEach(function(element) {
		// console.log(document.getElementById(element));

		if(document.getElementById(element)) {
      var box = document.getElementById(element).getBoundingClientRect();
      var element_coordinates = { 'x' : box.x, 'y' : box.y, 'height' : box.height, 'width' : box.width };
      data[element] = element_coordinates;
		}
	});
	setData(data);
}

var point_arr = [];

function createPoints() {
	var points_length = 15;
	for(var i=0; i<points_length; i++) {
		var point =  document.createElement('input');
		var id = 'Pt' + (i+1);
		// console.log(id);
		point.setAttribute('type', 'button');
		point.setAttribute('class', 'calibration_btn');
		point.setAttribute('id', id);

		point.style.width = '20px';
		point.style.height = '20px';

		point_arr.push(point);
		calibration_div.appendChild(point);
	}
}


function setBoxCoordinates() {
	var data = {};
	var box_arr = ['arrow_up_box', 'arrow_down_box', 'arrow_left_box', 'arrow_right_box', 'toggle_btn_box'];

	box_arr.forEach(function(bounding_box) {
		// console.log(document.getElementById(bounding_box));

		if(document.getElementById(bounding_box)) {
      var box = document.getElementById(bounding_box).getBoundingClientRect();

      var box_data = { 
      	'x' : box.x, 
      	'y' : box.y,
      	'height' : box.height,
      	'width' : box.width 
      };
      data[bounding_box] = box_data;
		}
	});
	setData(data);
}


function plotPoints() {
	var box_data;
	var left_coor = {}, right_coor = {}, top_coor = {}, bottom_coor = {}, center_coor = {};
	getData(function(data) {
		box_data = data['arrow_left_box'];
		arrow_data = data['arrow_left'];

		left_coor = { 'x' : arrow_data.x, 'y'	: (arrow_data.y+(arrow_data.height/2))-10 };
		top_coor = { 'x' : (box_data.x+(box_data.width/2)), 'y' : box_data.y };
		bottom_coor = { 'x' : (box_data.x+(box_data.width/2)), 'y' : (box_data.y+box_data.height) };
		point_arr.forEach(function(point) {
			if(point.id === 'Pt1')	setPointCoordinates(point, left_coor.x, left_coor.y);
			if(point.id === 'Pt2')	setPointCoordinates(point, top_coor.x, top_coor.y);
			if(point.id === 'Pt3') 	setPointCoordinates(point, bottom_coor.x, bottom_coor.y);
		});


		box_data = data['arrow_right_box'];
		arrow_data = data['arrow_right'];

		right_coor = { 'x' : (box_data.x+box_data.width)-30, 'y' : (arrow_data.y+(arrow_data.height/2))-10 };
		top_coor = { 'x' : (box_data.x+(box_data.width/2)), 'y' : box_data.y };
		bottom_coor = { 'x' : (box_data.x+(box_data.width/2)), 'y' : (box_data.y+box_data.height) };
		point_arr.forEach(function(point) {
			if(point.id === 'Pt4')	setPointCoordinates(point, right_coor.x, right_coor.y);
			if(point.id === 'Pt5')	setPointCoordinates(point, top_coor.x, top_coor.y);
			if(point.id === 'Pt6') 	setPointCoordinates(point, bottom_coor.x, bottom_coor.y);
		});


		box_data = data['arrow_up_box'];
		arrow_data = data['arrow_up'];

		left_coor = { 'x' : box_data.x, 'y'	: (box_data.y+arrow_data.height) };
		right_coor = { 'x' : (box_data.x+box_data.width)-10, 'y'	: (box_data.y+arrow_data.height) };
		center_coor = { 'x' : (arrow_data.x+(arrow_data.width/2))-10, 'y' : (box_data.y+arrow_data.height) };
		point_arr.forEach(function(point) {
			if(point.id === 'Pt7')	setPointCoordinates(point, left_coor.x, left_coor.y);
			if(point.id === 'Pt8')	setPointCoordinates(point, right_coor.x, right_coor.y);
			if(point.id === 'Pt9')	setPointCoordinates(point, center_coor.x, center_coor.y);
		});


		box_data = data['arrow_down_box'];
		arrow_data = data['arrow_down'];

		left_coor = { 'x' : box_data.x, 'y'	: box_data.y };
		right_coor = { 'x' : (box_data.x+box_data.width)-10, 'y'	: box_data.y };
		center_coor = { 'x' : (arrow_data.x+(arrow_data.width/2))-10, 'y' : box_data.y };
		point_arr.forEach(function(point) {
			if(point.id === 'Pt10')	setPointCoordinates(point, left_coor.x, left_coor.y);
			if(point.id === 'Pt11')	setPointCoordinates(point, right_coor.x, right_coor.y);
			if(point.id === 'Pt12')	setPointCoordinates(point, center_coor.x, center_coor.y);
		});


		box_data = data['toggle_btn_box'];
		arrow_data = data['toggle_btn'];

		left_coor = { 'x' : arrow_data.x-70, 'y'	: (arrow_data.y+(arrow_data.height/2))-10 };
		right_coor = { 'x' : (arrow_data.x+arrow_data.width)+50, 'y'	: (arrow_data.y+(arrow_data.height/2))-10 };
		center_coor = { 'x' : (arrow_data.x+(arrow_data.width/2))-10, 'y' : arrow_data.y-50 };
		point_arr.forEach(function(point) {
			if(point.id === 'Pt13')	setPointCoordinates(point, left_coor.x, left_coor.y);
			if(point.id === 'Pt14')	setPointCoordinates(point, right_coor.x, right_coor.y);
			if(point.id === 'Pt15')	setPointCoordinates(point, center_coor.x, center_coor.y);
		});
	});
}

function setPointCoordinates(point, x, y) {
	point.style.left = x+'px';
	point.style.top = y+'px';
}

function hideArrows() {
	$('.arrows').css('opacity', 0);
	$('#toggle_btn').css('opacity', 0);
	toggle_btn.style.display = 'none';
}

function showArrows() {
	$('.arrows').css('opacity', 1);
	$('#toggle_btn').css('opacity', 1);
	toggle_btn.style.display = 'block';
}









/* FOR BRANCH gazeButtons1 */

function pickLinks() {
	console.clear();
	console.log("links");
	var i=0;

	// $('#click_next').on('click', function() {
	// 	if(i==0) {
	// 		console.log("click next if " + i);
	// 		link_arr[i].classList.add('selected');
	// 		i++;
	// 	}
	// 	else if(i>0 && i<link_arr.length) {
	// 		console.log("click next elseif " + i);
	// 		link_arr[i-1].classList.remove('selected');
	// 		link_arr[i].classList.add('selected');
	// 		i++;
	// 	}
	// 	else {
	// 		alert("end of the list");
	// 	}
	// });

	// $('#click_prev').on('click', function() {
	// 	if(i==(link_arr.length-1)) {
	// 		i--;
	// 		console.log("click prev if " + i);
	// 		link_arr[i].classList.add('selected');
	// 	}
	// 	else if(i>0 && i<link_arr.length) {
	// 		i--;
	// 		console.log("click prev elseif " + i + " " + link_arr[i]);
	// 		link_arr[i+1].classList.remove('selected');
	// 		link_arr[i].classList.add('selected');
	// 	}
	// 	else {
	// 		alert("start of the list");
	// 	}
	// });

	$('#click_center').on('click', function() {
		console.log("click link " + link_arr[i-1]);
		var coor = getCoordinates(link_arr[i-1]);
		console.log(coor);
		link_arr[i-1].click();
		link_arr[i-1].classList.remove('selected');
		i=0;
	});
}


function pickButtons() {
	console.clear();
	console.log("buttons");	
	var i=0;

	$('#press_next').on('click', function() {
		if(i==0) {
			console.log("press next if " + i);
			button_arr[i].classList.add('selected');
			i++;
		}
		else if(i>0 && i<button_arr.length) {
			console.log("press next elseif " + i);
			button_arr[i-1].classList.remove('selected');
			button_arr[i].classList.add('selected');
			i++;
		}
		else {
			alert("end of the list");
		}
	});

	$('#press_prev').on('click', function() {
		if(i==(button_arr.length-1)) {
			i--;
			console.log("press prev if " + i);
			button_arr[i].classList.add('selected');
		}
		else if(i>0 && i<button_arr.length) {
			i--;
			console.log("press prev elseif " + i);
			console.log(button_arr[i]);
			button_arr[i+1].classList.remove('selected');
			button_arr[i].classList.add('selected');
		}
		else {
			alert("start of the list");
		}
	});

	$('#press_center').on('click', function() {
		console.log("press button");
		console.log(button_arr[i-1]);
		var coor = getCoordinates(button_arr[i-1]);
		console.log(coor);
		button_arr[i-1].click();
		button_arr[i-1].classList.remove('selected');
		i=0;
	});
}


function pickFields() {
	console.clear();
	console.log("fields");
	var i=0;

	$('#focus_next').on('click', function() {
		if(i==0) {
			console.log("focus next if " + i);
			field_arr[i].classList.add('selected');
			i++;
		}
		else if(i>0 && i<field_arr.length) {
			console.log("focus next elseif " + i);
			field_arr[i-1].classList.remove('selected');
			field_arr[i].classList.add('selected');
			i++;
		}
		else {
			alert("end of the list");
		}
	});

	$('#focus_prev').on('click', function() {
		if(i==(field_arr.length-1)) {
			i--;
			console.log("focus prev if " + i);
			field_arr[i].classList.add('selected');
		}
		else if(i>0 && i<field_arr.length) {
			i--;
			console.log("focus prev elseif " + i);
			console.log(field_arr[i]);
			field_arr[i+1].classList.remove('selected');
			field_arr[i].classList.add('selected');
		}
		else {
			alert("start of the list");
		}
	});

	$('#focus_center').on('click', function() {
		console.log("focus button");
		console.log(field_arr[i]);
		var coor = getCoordinates(field_arr[i]);
		console.log(coor);
		field_arr[i].focus();
		field_arr[i-1].classList.remove('selected');
		i=0;
	});
}

function getCoordinates(element) {
	
	if(element == null) {
		alert('element is null');
	}
	else{
		var box = element.getBoundingClientRect();
		var top_coordinate = box.top + pageYOffset;
		var left_coordinate = box.left + pageXOffset;
		var width = box.width;
		var height = box.height;
		var bottom_coordinate =box.bottom + pageYOffset;
		var right_coordinate = box.right + pageXOffset;

		return {
			top: top_coordinate,
			left: left_coordinate,
			right: right_coordinate,
			bottom: bottom_coordinate,
			width: width,
			height: height
		}
	}
}

/* END */